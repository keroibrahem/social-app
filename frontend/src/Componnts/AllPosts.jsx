import React from "react";
import Post  from "./Post"

export default function Card(props) {
  const {items,handelincrement,handeldelete,handelReset}=props

  return (
    <>
      <div>
        {items.map((itm) => (
          <Carditem
            key={itm.id}
            name={itm.name}
            count={itm.count}
            handelincrement={() => handelincrement(itm.id, 1)}
            handeldecrement={() => handelincrement(itm.id, -1)}
            handeldelete={() => handeldelete(itm.id)}
          />
        ))}
      </div>

      {items.length>0&& <button
        onClick={handelReset}
        className="px-5 py-1 mt-4 mx-10 text-white bg-gray-500 rounded hover:bg-gray-800 btn"
      >
        Reset
      </button>}
      {items.length===0 &&<div className="text-center text-gray-500 mt-10">
        <h2 className="text-2xl font-semibold">Your cart is empty!</h2>
        <p className="text-lg">Add some items to your cart to see them here.</p>
      </div>}
    </>
  );
}
