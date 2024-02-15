# 실행 방법

기본적으로 모두 Container 화 되어있습니다. 그렇기 때문에 따로해주셔야 하는 작업은 docker를 선행적으로 설치해주셔야 합니다.


`run.sh` 파일이 최초 실행에 필요한 `secret` , `config`, `ssl 인증서 생성`, `컨테이너 실행` 등을 수행하게 됩니다.

```shell
chmod 777 run.sh
./run.sh
```

기본적으로 `ubuntu`와 `bash` 에 맞춰져있는 shell script 임으로 다른환경에서 작동을 보장하기 어렵습니다.

# 선행 사항

`run.sh` 스크립트로 실행하기 위해서는 기본적으로 `dns` 를 구매 해야 합니다. 혹은 `root-domain` 이 `your-domain.com` 면  아래 3개 `sub domain` 에 A레코드를 설정을 해주셔야 합니다.

`openvidu.your-domain.com` ,`socket.your-domain.com`, `your-domain.com` 에 `A 레코드` 로 `public ip` 를 설정 해주셔야 합니다.

이 부분은 `run.sh` 실행시에도 알려주게 됩니다.

또한 이메일 인증을 사용하기 때문에 `smtp` 설정도 필요합니다. `run.sh` 를 실행하면 `smtp` 용 `이메일`, `비밀번호`, `smtp host 정보` 를 입력 받습니다.

각각 [네이버](https://help.naver.com/service/30029/contents/21344?lang=ko) , [다음](https://cs.daum.net/faq/266/12145.html#17989), [구글](https://support.google.com/a/answer/176600?hl=ko)
에서 확인하실 수 있습니다.

그 외엔 `run.sh` 의 지침사항을 따라주세요.


