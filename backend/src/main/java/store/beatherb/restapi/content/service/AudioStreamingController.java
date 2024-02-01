package store.beatherb.restapi.content.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/audio")
@Slf4j
public class AudioStreamingController {

    private static final String MP3_FILE_PATH = "d:/1.mp3";

    private static final String SEGMENT_DIRECTORY = "d:/audio/0";

    @GetMapping("{segmentName:.+}")
    public ResponseEntity<Resource> getSegment(@PathVariable String segmentName, @RequestHeader("Authorization") String authorizationHeader) {

        log.info("authorization = [{}]",authorizationHeader);

        log.info("SegmentName = [{}]",segmentName);
        File segmentFile = new File(SEGMENT_DIRECTORY + "/" + segmentName);
        if (segmentFile.exists()) {
            Resource resource = new FileSystemResource(segmentFile);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
//        return ResponseEntity.ok("um");
    }


    @GetMapping("/0.m3u8")
    public ResponseEntity<Resource> videoHlsM3U8() {
//        log.debug("************** class = {}, function = {}", this.getClass().getName(), new Object(){}.getClass().getEnclosingMethod().getName());
        String fileFullPath = SEGMENT_DIRECTORY + "/playlist.m3u8";
        Resource resource = new FileSystemResource(fileFullPath);
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=playlist.m3u8");
        headers.setContentType(MediaType.parseMediaType("application/vnd.apple.mpegurl"));
        return new ResponseEntity<Resource>(resource, headers, HttpStatus.OK);
    }



    @GetMapping(value = "/stream", produces = "application/vnd.apple.mpegurl")
    public ResponseEntity<String> streamAudio() throws IOException {
        // Create HLS segments from the MP3 file
        List<Resource> segments = createHLSSegments();
        StringBuilder playlistContent = new StringBuilder("#EXTM3U\n");
        for (int i = 0; i < segments.size(); i++) {
            playlistContent.append("#EXTINF:10.0,\n")
                    .append("segment-").append(String.format("%03d", i)).append(".aac\n");
        }

        // Return the HLS playlist as a String
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/vnd.apple.mpegurl"))
                .body(playlistContent.toString());
    }

    private List<Resource> createHLSSegments() throws IOException {
        Path mp3FilePath = Path.of(MP3_FILE_PATH);
        File mp3File = mp3FilePath.toFile();

        // Create the directory if it doesn't exist
        File segmentDir = new File(SEGMENT_DIRECTORY);
        segmentDir.mkdirs();

        ProcessBuilder processBuilder = new ProcessBuilder(
                "ffmpeg",
                "-i", mp3File.getAbsolutePath(),
                "-c:a", "aac",
                "-b:a", "192k",
                "-hls_time", "10",
                "-hls_list_size", "0",
                "-hls_segment_filename", SEGMENT_DIRECTORY  + "/segment-%03d.aac",
                SEGMENT_DIRECTORY  + "/playlist.m3u8"
        );

        log.info(String.join(" ",processBuilder.command().toArray(new String[0])));

//
//        Process process = processBuilder.start();
//        log.info("process : start");
//        try {
//            process.waitFor();
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }

        log.info("process : end");

        // Get the list of HLS segments
        List<Resource> segments = new ArrayList<>();
        Files.list(Path.of(SEGMENT_DIRECTORY )).forEach(filePath -> {
            if (Files.isRegularFile(filePath)) {
                segments.add(new FileSystemResource(filePath));
            }
        });

        return segments;
    }
}