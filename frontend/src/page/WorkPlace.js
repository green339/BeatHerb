import Multitrack from 'wavesurfer-multitrack'
import { useRef, useEffect, useState } from 'react';
import Record from'../components/Record.js'

export default function WorkPlace() {
  const containerRef = useRef();
  const multitrack = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRecord, setShowRecord] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState(null);

  console.log(recordedUrl);
  
  useEffect(() => {
    if(containerRef.current && !multitrack.current) {
      multitrack.current = Multitrack.create(
        [
          {
            id: 1
          },
          {
            id: 2
          },
        ],
        {
          container: containerRef.current, // required!
          minPxPerSec: 10, // zoom level
          rightButtonDrag: false, // set to true to drag with right mouse button
          cursorWidth: 2,
          cursorColor: '#D72F21',
          trackBackground: '#2D2D2D',
          trackBorderColor: '#7C7C7C',
          dragBounds: true,
          envelopeOptions: {
            lineColor: 'rgba(255, 0, 0, 0.7)',
            lineWidth: 4,
            dragPointSize: window.innerWidth < 600 ? 20 : 10,
            dragPointFill: 'rgba(255, 255, 255, 0.8)',
            dragPointStroke: 'rgba(255, 255, 255, 0.3)',
          },
        },
      )
        
      // Events
      multitrack.current.on('start-position-change', ({ id, startPosition }) => {
        console.log(`Track ${id} start position updated to ${startPosition}`)
      });
          
      multitrack.current.on('start-cue-change', ({ id, startCue }) => {
        console.log(`Track ${id} start cue updated to ${startCue}`)
      });
          
      multitrack.current.on('end-cue-change', ({ id, endCue }) => {
        console.log(`Track ${id} end cue updated to ${endCue}`)
      });
          
      multitrack.current.on('volume-change', ({ id, volume }) => {
        console.log(`Track ${id} volume updated to ${volume}`)
      });
          
      multitrack.current.on('fade-in-change', ({ id, fadeInEnd }) => {
        console.log(`Track ${id} fade-in updated to ${fadeInEnd}`)
      });
          
      multitrack.current.on('fade-out-change', ({ id, fadeOutStart }) => {
        console.log(`Track ${id} fade-out updated to ${fadeOutStart}`)
      });
          
      multitrack.current.on('intro-end-change', ({ id, endTime }) => {
        console.log(`Track ${id} intro end updated to ${endTime}`)
      });
          
      multitrack.current.on('envelope-points-change', ({ id, points }) => {
        console.log(`Track ${id} envelope points updated to`, points)
      });
      
      // Destroy all wavesurfer instances on unmount
      // This should be called before calling initMultiTrack again to properly clean up
      window.onbeforeunload = () => {
        multitrack.current.destroy();
      };
        
      return () => {
        multitrack.current.destroy();
        multitrack.current = null;
      };
    }
  }, []);

  const playPause = () => {
    multitrack.current.isPlaying() ? multitrack.current.pause() : multitrack.current.play();
    setIsPlaying(multitrack.current.isPlaying());
  }

  const addfile = (id, e) => {
    const { files } = e.target;
    const file = files[0];

    if(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const blob = new window.Blob([new Uint8Array(e.target.result)]);
        const url = URL.createObjectURL(blob);

        console.log(url);
        multitrack.current.addTrack({
          id,
          url,
          draggable: true,
          startPosition: 0,
          envelope: true,
          volume: 0.8,
          options: {
            waveColor: 'hsl(161, 87%, 49%)',
            progressColor: 'hsl(161, 87%, 20%)',
          },
        })
      }

      reader.onerror = (e) => {
        alert(`Track ${id}에 파일을 추가하지 못했습니다.`);
        console.log(e);
      }
        
      reader.readAsArrayBuffer(file);
    }
  }

  const addTrackByUrl = (url) => {
    console.log(url);
    multitrack.current.addTrack({
      id: 2,
      url,
      draggable: true,
      startPosition: 0,
      envelope: true,
      volume: 0.8,
      options: {
        waveColor: 'hsl(161, 87%, 49%)',
        progressColor: 'hsl(161, 87%, 20%)',
      },
    })
  }
  
  return (
    <div className="flex flex-col gap-8 m-8">
      <div>
        Track 1: 
        <input 
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={(e) => addfile(1, e)}
        />
      </div>
      <div>
        Track 2: 
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={(e) => addfile(2, e)}
        />
      </div>
      <div ref={containerRef} />
      <div className="flex place-content-center">
        <button className="btn btn-primary w-1/6" onClick={playPause}>
          {multitrack.current && isPlaying ? "Pause" : "Play"}
        </button>
        <button className="btn btn-primary" onClick={() => setShowRecord(!showRecord)}>
          Record
        </button>
      </div>
      {showRecord && (
        <>
          <Record addTrack={() => addTrackByUrl(recordedUrl)} recordedUrl={recordedUrl} setRecordedUrl={setRecordedUrl} />
        </>
      )}
    </div>
  );
}