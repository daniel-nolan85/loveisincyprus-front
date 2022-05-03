import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () => (
    <div className='admin-cards'>
      {subs &&
        subs.map((s) => (
          <div className='admin-card' key={s._id}>
            <div>
              <Link to={`/sub/${s.slug}`}>
                <h3>{s.name}</h3>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
      ) : (
        <>
          <h1 className='center'>Sub-Categories</h1>
          {showSubs()}
        </>
      )}
    </div>
  );
};

export default SubList;
