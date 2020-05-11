import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchParties } from "../../features/parties/partiesSlice";

const PartiesPage = () => {
  const dispatch = useDispatch();
  const parties = useSelector((state) => state.parties.items);

  useEffect(() => {
    dispatch(fetchParties());
  }, [dispatch]);

  return (
    <div>
      <h1>Готовые идеи</h1>
      <Link to="/parties/create">Создать</Link>
      <div>
        {parties &&
          parties.map((party) => (
            <div>
              <Link to={`/parties/${party.id}`}>{party.name}</Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PartiesPage;
