# BeatHerb
### SSAFY 10기 공통 프로젝트 서울 5반 :musical_score: 'Bit는 알아도 Beat는 모른다' :musical_score: </br>

![beatherb](/uploads/5e6cf29a813b761fe830cc749e19996f/beatherb.PNG)

## :green_book: 목차 :green_book:
:one: [프로젝트 소개](#프로젝트 소개) <br/>
:two: [개발 환경](#개발 환경)<br/>
:three: [서비스 화면](#서비스 화면) <br/>
:four: [주요 기능](#주요 기능) <br/>
:five: [프로젝트 특징 기술 소개](#프로젝트 특징 기술 소개) <br/>
:six: [설계 문서](#설계 문서) <br/>
:seven: [팀원 소개](#팀원 소개) <br/>

## 1. 프로젝트 소개
### :scroll: Overview :scroll:
#### "음악 제작? 어렵게 생각하지 마세요! BeatHerb가 도와드립니다."
##### 피아노 반주에 키보드 소리를 입혀보거나 잔잔한 멜로디에 고양이 울음 소리를 입혀보거나 마음껏 소리를 만들어보세요. <br /> 내가 만든 소리는 업로드와 라이브를 통해 BeatHerb 사용자들과 공유할 수 있습니다.

## 2. 개발 환경
### :books: Tech Stack :books:
#### Backend Framework
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![SpringBoot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white)
![OpenVidu](https://img.shields.io/badge/OpenVidu-yellow?style=for-the-badge&logo=LiveChat&logoColor=white)
![Socket.io](https://img.shields.io/badge/WebSocket-blue?style=for-the-badge&logo=Socket.io)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white)
![SpringDataJpa](https://img.shields.io/badge/Spring_Data_Jpa-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
#### Frontend Framework
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ffmpeg](https://img.shields.io/badge/ffmpeg-007808?style=for-the-badge&logo=ffmpeg)
![Tone.js](https://img.shields.io/badge/Tone.js-red?style=for-the-badge&logo=Tone.js)
![Wavesuffer.js](https://img.shields.io/badge/Wavesuffer.js-orange?style=for-the-badge&logo=Wavesuffer.js)
![waveform_playlist](https://img.shields.io/badge/waveform_playlist-green?style=for-the-badge&logo=waveform_playlist)
![ffmpeg.wasm](https://img.shields.io/badge/ffmpeg.wasm-007808?style=for-the-badge&logo=ffmpeg.wasm)
#### DB
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
#### Management Tool
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![GitLab](https://img.shields.io/badge/gitlab-orange.svg?style=for-the-badge&logo=gitlab&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

## 3. 서비스 화면

## 4. 주요 기능
#### 1. 소리 쌓기 서비스 :sound:
##### 기존에 등록되어 있는 음반 정보를 가져와서 그 음반 위에 소리를 쌓을 수 있습니다.<br/><br/> ex)<br/>1-1). 피아노 연주가 나오는 멜로디 정보를 가져와서 보컬 소리를 쌓을 수 있음.<br/>1-2). 원하는 보컬 정보를 가져온 후 piano, synth, drum과 같은 가상악기를 통해 소리를 녹음하여 쌓을 수 있음.


#### 2. 라이브를 활용해 커뮤니티로 확장 :tv:
##### 라이브에서 공유하는 컨텐츠에 관심 있는 사람은 누구나 들어와서 참여 할 수 있고 라이브에 참여하는 사람들은 실시간으로 댓글을 주고 받으며 원활한 소통을 할 수 있습니다.

#### 3. 해시태그를 이용한 상세 검색 :computer:
##### bpm, key 등과 같은 해시태그를 기반으로 정확한 검색 결과를 얻을 수 있습니다.

## 5. 프로젝트 특징 기술 소개
#### 1. kafka 도입을 활용한 멀티 프로세싱 음악 처리 후 사용자는 업로드가 되었다는 신호를 빠르게 받을 수 있다.<br/> :arrow_forward: (약 10초 이상 -> 약 3초)
#### 2. hls 기술을 이용한 실시간 음악 스트리밍
#### 3. Openvidu 를 활용한 라이브

## 6. 설계 문서
#### API
<details>
<summary>Member</summary>
![member-controller](/uploads/86e6f8888f3eac80ad12acf659a6f1da/member-controller.PNG)
![member-info-controller](/uploads/026d9e72b03460ba22c0b2fc06469c69/member-info-controller.PNG)
</details>

<details>
<summary>Auth</summary>
![auth-controller](/uploads/42268e797cbc6c283b823d3d603cbae0/auth-controller.PNG)
</details>

<details>
<summary>HashTag</summary>
![hash-tag-controller](/uploads/e0240fb282ab5d936eff92c94743766f/hash-tag-controller.PNG)
</details>

<details>
<summary>Live</summary>
![live-controller](/uploads/ff3abc8893837f545349fa3cfdb2bc8b/live-controller.PNG)
</details>

<details>
<summary>Content</summary>
![content-controller](/uploads/6d540e30751dde097ae2cc04b85d994a/content-controller.PNG)
![content-load-controller](/uploads/8c5c7836b0c711ece760ab49374d3555/content-load-controller.PNG)
![content-detail-controller](/uploads/f468c84a4fb8da9c07cb2f666066113f/content-detail-controller.PNG)
![content-search-controller](/uploads/808b950a4edca9ea9f56f31d164d669d/content-search-controller.PNG)
</details>

<details>
<summary>Follow</summary>
![follwer-controller](/uploads/5ce9a9ec610a347d1176252644928545/follwer-controller.PNG)
![following-controller](/uploads/7fb20754acfb80ac812a9f9bf6368502/following-controller.PNG)
</details>

<details>
<summary>DirectMessage</summary>
![direct-message-controller](/uploads/2730867f590f29ceb3f3c7ddbbab970e/direct-message-controller.PNG)
</details>

<details>
<summary>Interest</summary>
![interest-controller](/uploads/a84fb3ecd8aae38831f0b7df35792f41/interest-controller.PNG)
</details>

<details>
<summary>Star</summary>
![star-controller](/uploads/1adc9a1ec22d8c2692cabedbd4d110a1/star-controller.PNG)
</details>

<details>
<summary>Comment</summary>
![comment-controller](/uploads/302ac002cb85debddd38b7072f5221f5/comment-controller.PNG)
</details>

#### ERD
![BeatHerb_erd](/uploads/21ec4252bfff6dd37f71c99fedc1b652/BeatHerb_erd.png)

#### Architecture Structure
![architecture](/uploads/140990d90cf62bb416ec31325464ac33/architecture.png)

## 7. 팀원 소개
|팀장(김도현)|팀원(김범수)|팀원(최지희)|팀원(박도연)|팀원(박세웅)|팀원(유시연)|
|------|---|---|---|---|---|
|![dohyun](/uploads/e4a3c494f282a03cd1c26b1377b9d7b2/dohyun.png){width=500px height=200px}|![bumsoo](/uploads/ac9a84b33f9b46b8ad43337c4dc87bc0/bumsoo.png){width=500px height=200px}|![sihee](/uploads/a8903c64a59a1da77954b64864d842f9/sihee.jpg){width=500px height=200px}|![doyeon](/uploads/4174f69c0a25a1af26b790a358ae87e6/doyeon.jpg){width=500px height=200px}|![seyoog](/uploads/f6c502884106fe25f4eda0cae178922c/seyoog.jpg){width=500px height=200px}|![siyeon](/uploads/63d13eced2448b27d8528fcfd8d2a49a/siyeon.jpg){width=500px height=200px}|
|Backend Lead/Infra|Frontend Lead|Full Stack|Full Stack|Full Stack|Full Stack|
