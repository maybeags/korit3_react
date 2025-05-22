export default function StudentsList() {
  const students = [ '김일', '김이', '김삼', '김사', '김오', '김육', '김칠', '김팔', '김구', '김십' ];

  return(
  <>
    <ul>
      {
          students.map((student, index) => {
            return <li key={index}>{index+1}. {student} 님</li>
          }
        )
      }
    </ul>
    <br />
    <ol>
      {
        students.map((student, index) => 
          <li key={index}>{student} 님</li>
        )
      }
    </ol>
  </>
  );
}