export default function StudentsList2() {
  const students = [ '김일', '김이', '김삼', '김사', '김오', '김육', '김칠', '김팔', '김구', '김십' ];

  return(
    <>
      <ul>
        {
          students.map((student, index) => 
            (<li key={index}>{index+1}. {student}</li>)
          )
        }
      </ul>
    </>
  );
}