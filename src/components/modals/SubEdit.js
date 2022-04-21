import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const SubEdit = ({
  subEditModalIsOpen,
  setSubEditModalIsOpen,
  subToEdit,
  updateSub,
  loading,
  setLoading,
  loadSubs,
}) => {
  const [name, setName] = useState(subToEdit.name);

  let { user } = useSelector((state) => ({ ...state }));

  const editSub = async (e, sub) => {
    e.preventDefault();
    setLoading(true);
    updateSub(sub.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.name} has been updated`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setSubEditModalIsOpen(false);
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  const subForm = () => (
    <div className='form-box sub update'>
      <div className='button-box'>
        <p className='form-header'>Update Sub-Category</p>
      </div>
      <form>
        <input
          type='text'
          className='input-field'
          placeholder='Name'
          defaultValue={subToEdit.name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
          // disabled={loading}
        />
        <button
          onClick={(e) => editSub(e, subToEdit)}
          type='submit'
          className='submit-btn'
          //   disabled={password.length < 6 || loading}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Update
        </button>
      </form>
    </div>
  );

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
    },
  };

  return (
    <Modal
      isOpen={subEditModalIsOpen}
      onRequestClose={() => setSubEditModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {subForm()}
    </Modal>
  );
};

export default SubEdit;
