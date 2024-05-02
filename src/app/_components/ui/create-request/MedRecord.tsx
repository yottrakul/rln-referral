export default function MedRecord() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => {
        return <div key={index}>HEllo</div>;
      })}
    </>
  );
}
