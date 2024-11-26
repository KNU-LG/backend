# KNU 종합설계프로젝트1 백엔드 레포지토리

## 기술 스택

<div align="center">
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"/>
<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/>
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"/>
</div>

## 서버 설정 방법

프로젝트 패키지 매니저는 yarn 4.5.0을 사용합니다. 이는 .yarn/releases에 cjs파일로 관리합니다. node 버전은 최소 v18이상에서 실행되며 테스팅 완료된 버전은 v22.5.1입니다.

### 환경변수

프로젝트를 실행하기 전 .env파일을 프로젝트 루트에 만들어줘야 합니다. 예시로 작성된 환경변수 파일은 example.env에 있습니다. 각 변수에 대한 설명은 아래와 같습니다.

- PORT - 프로젝트가 실행될 서버의 포트 번호입니다. 방화벽 혹은 공유기의 포트 포워드 설정을 확인 해 주세요.
- DATABASE_URL - 프로젝트는 postgresql을 사용합니다. 이 변수값으로 postgresql에 접근할 수 있어야 합니다.
- PASSWORD_ROUND - 비밀번호 해쉬값에 사용되는 정수값입니다. 1~100사이의 임의의 값을 추천합니다.
- JWT_SECRET - JWT 토큰을 만들 때 사용되는 문자열입니다. 다른 사람이 유추하기 어려운 비밀번호를 넣어주세요.
- MAIL_USER - 비밀번호 찾기 API는 내부적으로 메일을 보내는 방식으로 작동합니다. gmail을 기준으로 하는 설정 방법은 밑에서 설명합니다.
- MAIL_PASSWORD - MAIL_USER와 마찬가지로 메일을 보낼 때 사용하는 비밀번호입니다.

### 메일 설정

find_password API는 메일을 보내는 방식으로 동작합니다. 다음은 gmail을 기준으로 메일 아이디를 설정하는 방법입니다.

![gmail-1](gmail-1.png)

먼저, gmail에 로그인한 뒤 우측 상단 톱니바퀴 버튼을 누른 후 모든 설정 보기 버튼을 눌러서 설정 화면에 진입합니다.

![alt text](gmail-2.png)

전달 및 POP/IMAP 탭에 들어가서 IMAP 사용 설정을 IMAP 사용으로 하고 저장합니다.

환경 변수 MAIL_USER에 세팅을 한 계정의 gmail의 메일 주소를 입력합니다.

![alt text](gmail-3.png)

google 계정 설정에서 앱 비밀번호를 검색해 들어갑니다.

앱 이름을 설정하고 앱 비밀번호 생성버튼을 누르면 16자리 알파벳이 생성되는데 이 값을 환경변수 MAIL_PASSWORD에 설정합니다.

### DB 설정

환경변수에 설정된 db url을 통해 postgresql을 접근할 수 있어야 합니다. 추천하는 방법은 docker와 docker-compose를 사용하는 방법입니다. 아래 내용은 docker-compose.yml를 통해 DB를 설정하는 방법입니다.

```yml
services:
  db:
    image: postgres:17
    container_name: postgres
    restart: always
    ports:
      - '40001:5432'
    environment:
      - POSTGRES_PASSWORD=password
    volumes:
      - ./data/postgres/:/var/lib/postgresql/data
```

위 파일은 docker-compose.yml의 예시입니다.

- image - postgres 17버전을 사용합니다
- container_name - 컨테이너 이름입니다. 임의로 지어주면 됩니다.
- restart: always - 서버가 재부팅 된 상황에서도 항상 실행하게 재시작 옵션을 줍니다.
- ports - postgresql이 실행될 포트 번호입니다. 앞 숫자는 실제 서버의 포트, 뒤 숫자는 도커 내부 포트(5432 고정)을 의미합니다.
- environment - postgres 이미지에 대한 환경변수 설정값입니다. 비밀번호를 설정하면 됩니다.
- volumes - docker 내부 파일 시스템과 서버의 파일 시스템을 연결합니다.

postgres 이미지에 대한 더 자세한 설명은 [https://hub.docker.com/\_/postgres](https://hub.docker.com/_/postgres)에서 확인할 수 있습니다.

docker를 사용하지 않고 로컬에 postgresql를 설정해도 됩니다. 프로젝트 환경변수 중 DATABASE_URL을 통해 postgresql에 접근 가능함이 보장되어야 합니다.

### 프로젝트 의존성 설치

모든 설정을 완료했으면 다음 명령어를 통해 프로젝트 의존성을 설치해야합니다.

```bash
$ yarn install
```

### Compile and run the project

다음 명령어중 하나로 프로젝트를 실행할 수 있으며 프로젝트는 환경 변수 PORT값에 적힌 포트번호를 사용합니다.

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## ER Diagram

DB는 postgresql을 사용하고 orm으로 prisma를 사용합니다. schema 정의는 prisma/schema.prisma 파일에 있습니다. 다음 그림은 이 파일로 만들어지는 DB의 다이어그램입니다.

![ERD](er-diagram.png)

## API 문서

API문서는 swagger로 관리합니다. nestjs의 swagger 모듈을 활용해 API 테스팅 및 문서화를 진행합니다. 빠진 문서의 컨트리뷰션 또한 환영합니다.

프로젝트 실행 시 /document로 접근하면 API 문서 내용을 확인할 수 있습니다.

![api-doc](api-doc.png)

## License

프로젝트는 MIT 라이선스입니다. [MIT licensed](https://github.com/KNU-LG/backend/blob/main/LICENSE)
