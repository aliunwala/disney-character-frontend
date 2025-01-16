import React from "react";

// characterDetails PROPS
interface characterDetailsProps {
  title: string;
  list: string[] | undefined;
  charId: string | undefined;
}

export default function CharacterDetails({
  title,
  list,
  charId,
}: characterDetailsProps) {
  return (
    <>
      {list && list.length > 0 && (
        <>
          <h4 style={{ fontWeight: "bold" }}>{title}</h4>
          <ul>
            {list.map((e: string) => {
              // console.log(e);
              return <li key={charId + e.replace(" ", "")}>{e}</li>;
            })}
          </ul>
        </>
      )}
    </>
  );
}
