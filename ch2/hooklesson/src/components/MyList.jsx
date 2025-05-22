export default function MyList() {
  const numbers = [1, 2, 3, 4, 5];
  return(
    <>
      <ul>
        {
          numbers.map((number, index) =>
            <li key={index}>배열의 각 element : {number*10}</li>
          )
        }
      </ul>
    </>
  );
}