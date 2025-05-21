function MainComponent() {
  return(
    <main className="main">
      <section className="section">
        <h2 className="section__title">About Me</h2>
        <p>
          안녕하세요, 저는 KoreaITAcademy 국비 과정으로 Full Stack 과정을 수료한 김일이라고 합니다. 최근에는 React를 이용한 프론트엔드에도 흥미를 가지고 있어 Full Stack 개발자 과정에 지망하게되었습니다. 문제 해결과 클린 코드를 중시하며, 팀원 간 협업을 통해 가치를 만들어 내는 것을 좋아합니다.
        </p>
      </section>
      <section className="section">
        <h2 className="section__title">Experience</h2>
        <ul>
          <li>
            <strong>2025.03-현재</strong> | KoreaITAcademy Full Stack 개발자 과정 수료<br/>
            - Spring Boot를 이용한 REST API 설계 및 구현<br/>
            - MariaDB, H2 인메모리 DB를 통한 ORM 관리 역량<br/>
            - Java, JavaScript, SQL 사용 역량
          </li>
          <li>
            <strong>2021.03 - 2025.02</strong> | 런던왕립대학교 Computer Science 학부 졸업<br/>
            - React Library <br/>
            - Spring Framework <br/>
            - Lambda / Arrow Expression 사용 역량
          </li>
        </ul>
      </section>
      <section className="section">
        <h2 className="section__title">Skills</h2>
        <p>
          <strong>Languages : </strong> Java, JavaScript, TypeScript <br/>
          <strong>Frameworks : </strong> Spring Boot, React, Vite <br/>
          <strong>Databases : </strong> MySQL, MariaDB, Java 기반 ORM <br/>
          <strong>Tools : </strong> Git, Docker, Intellij, Visual Studio Code
        </p>
      </section>
    </main>
  );
}

export default MainComponent;