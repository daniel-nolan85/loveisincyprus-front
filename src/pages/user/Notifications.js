import React, { useState, useEffect, useRef } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AddComment from '../../components/modals/AddComment';
import NotifPost from '../../components/modals/NotifPost';
import io from 'socket.io-client';
import { ChatState } from '../../context/ChatProvider';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Mobile from '../../components/user/Mobile';

let socket;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [data, setData] = useState([]);
  const [populatedNotifs, setPopulatedNotifs] = useState([]);
  const [numOfNewNotifs, setNumOfNewNotifs] = useState(0);
  const [notifModalIsOpen, setNotifModalIsOpen] = useState(false);
  const [post, setPost] = useState({});
  const [currentPost, setCurrentPost] = useState({});
  const [image, setImage] = useState({});
  // const [notifToDelete, setNotifToDelete] = useState([]);
  const [postToDelete, setPostToDelete] = useState([]);
  const [postDeleteModalIsOpen, setPostDeleteModalIsOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState([]);
  const [commentDeleteModalIsOpen, setCommentDeleteModalIsOpen] =
    useState(false);
  const [postOfCommentToDelete, setPostOfCommentToDelete] = useState([]);
  const [commentEditModalIsOpen, setCommentEditModalIsOpen] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState({});
  const [postOfCommentToEdit, setPostOfCommentToEdit] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [notifsDisplay, setNotifsDisplay] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const [commentReportModalIsOpen, setCommentReportModalIsOpen] =
    useState(false);
  const [commentToReport, setCommentToReport] = useState({});
  const [postOfCommentToReport, setPostOfCommentToReport] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const isFirstRun = useRef(true);

  const { socketConnected, setSocketConnected } = ChatState();

  useEffect(() => {
    fetchNotifications();
    populateNotifications();
  }, []);

  useEffect(() => {
    popPostNotifs();
  }, [data]);

  useEffect(() => {
    setNumOfNewNotifs(notifications.filter((x) => x.new === true).length);
  }, [notifications]);

  useEffect(() => {
    today();
  }, [populatedNotifs]);

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true }
    );
  }, []);

  const fetchNotifications = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-notifications`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setNotifications(res.data.notifications);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const populateNotifications = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/populate-notifications`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const popPostNotifs = () => {
    for (var i = 0; i < notifications.length; i++) {
      for (var j = 0; j < data.length; j++) {
        if (notifications[i].notif == data[j]._id) {
          notifications[i].notif = data[j];
        }
      }
    }
    // console.log(notifications);
    setPopulatedNotifs(notifications);
  };

  const newNotifs = () => {
    const newbies = populatedNotifs.filter((n) => {
      return n.new === true;
    });
    setNotifsDisplay(newbies);
  };

  const today = () => {
    const now = new Date();
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const today = populatedNotifs.filter((n) => {
      var time = new Date(n.occurred).getTime();
      return yesterday < time && time < now;
    });
    setNotifsDisplay(today);
  };

  const thisWeek = () => {
    const now = new Date();
    const lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
    const thisWeek = populatedNotifs.filter((n) => {
      var time = new Date(n.occurred).getTime();
      return lastWeek < time && time < now;
    });
    setNotifsDisplay(thisWeek);
  };

  const thisMonth = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const thisMonth = populatedNotifs.filter((n) => {
      const [year, month] = n.occurred.split('-');
      return currentMonth === +month && currentYear == year;
    });
    setNotifsDisplay(thisMonth);
  };

  const select = () => {
    setDatePickerIsOpen(true);
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      const selectedMonth = new Date(startDate).getMonth() + 1;
      const selectedYear = new Date(startDate).getFullYear();
      const chosenMonth = populatedNotifs.filter((n) => {
        const [year, month] = n.occurred.split('-');
        return selectedMonth === +month && selectedYear == year;
      });
      setNotifsDisplay(chosenMonth);
    }
  }, [startDate]);

  const viewNotif = async (n) => {
    // console.log(n);
    await axios
      .post(
        `${process.env.REACT_APP_API}/mark-notif-as-read`,
        { n },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        fetchNotifications();
      });
    console.log(n);
    setNotifModalIsOpen(true);
    setPost(n);
    // setNotifToDelete(n);
    n.new = false;
  };

  const handleDelete = async (post) => {
    setPostDeleteModalIsOpen(true);
    setPostToDelete(post);
  };

  const handleComment = (post) => {
    setCurrentPost(post);
    setCommentModalIsOpen(true);
  };

  const addComment = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${process.env.REACT_APP_API}/add-comment`,
        { postId: currentPost._id, comment, image, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        toast.success(`Comment added.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setComment('');
        setImage({});
        setCommentModalIsOpen(false);
        fetchNotifications();
        populateNotifications();
        if (res.data.postedBy._id !== user._id) {
          socket.emit('new comment', res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editComment = async (postId, comment) => {
    setCommentEditModalIsOpen(true);
    setCommentToEdit(comment);
    setPostOfCommentToEdit(postId);
  };

  const removeComment = async (postId, comment) => {
    setCommentDeleteModalIsOpen(true);
    setPostOfCommentToDelete(postId);
    setCommentToDelete(comment);
  };

  const reportComment = async (postId, comment) => {
    setCommentReportModalIsOpen(true);
    setCommentToReport(comment);
    setPostOfCommentToReport(postId);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    setLoadingImg(true);

    await axios
      .post(`${process.env.REACT_APP_API}/upload-image`, formData, {
        headers: {
          authtoken: user.token,
        },
      })
      .then((res) => {
        setImage({
          url: res.data.url,
          public_id: res.data.public_id,
        });
        setLoadingImg(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingImg(false);
      });
  };

  const handleLike = async (_id) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/like-post`,
        { _id, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.postedBy !== user._id) {
          // socket.emit('like post', res.data);
        }
        fetchNotifications();
        populateNotifications();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnlike = async (_id) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/unlike-post`,
        { _id, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        fetchNotifications();
        populateNotifications();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const acceptInvite = async (post) => {
    console.log(post);
    toast.success(`Great! We can't wait to see you there!`, {
      position: toast.POSITION.TOP_CENTER,
    });
    setNotifModalIsOpen(false);
    await axios
      .post(
        `${process.env.REACT_APP_API}/accept-invite`,
        { user, post },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchNotifications();
        populateNotifications();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            events: res.data.events,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const maybe = async (post) => {
    console.log(post);
    toast.success(`Ok, we'll keep our fingers crossed!`, {
      position: toast.POSITION.TOP_CENTER,
    });
    setNotifModalIsOpen(false);
    await axios
      .post(
        `${process.env.REACT_APP_API}/maybe`,
        { user, post },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchNotifications();
        populateNotifications();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            events: res.data.events,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const declineInvite = async (post) => {
    console.log(post);
    toast.success(`Too bad! We hope to see you at the next one!`, {
      position: toast.POSITION.TOP_CENTER,
    });
    setNotifModalIsOpen(false);
    await axios
      .post(
        `${process.env.REACT_APP_API}/decline-invite`,
        { user, post },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchNotifications();
        populateNotifications();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            events: res.data.events,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <h1 className='center'>
          You have{' '}
          {numOfNewNotifs === 0 ? (
            `${numOfNewNotifs} new notifications`
          ) : numOfNewNotifs === 1 ? (
            <span className='link' onClick={newNotifs}>
              {numOfNewNotifs} new notification
            </span>
          ) : (
            numOfNewNotifs > 1 && (
              <span className='link' onClick={newNotifs}>
                {numOfNewNotifs} new notifications
              </span>
            )
          )}
        </h1>
        <div className='points-filter-btns'>
          <button className='submit-btn' onClick={today}>
            Today
          </button>
          <button className='submit-btn' onClick={thisWeek}>
            This Week
          </button>
          <button className='submit-btn' onClick={thisMonth}>
            This Month
          </button>
          <button className='submit-btn' onClick={select}>
            Select
          </button>
        </div>
        <div className='filter-datepicker'>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setDatePickerIsOpen(false);
            }}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            open={datePickerIsOpen}
            onClickOutside={() => setDatePickerIsOpen(false)}
          />
        </div>
        <div
          className='small-container cart-page'
          style={{ marginTop: '40px' }}
        >
          {notifsDisplay.length === 0 ? (
            <h1 className='center'>
              No notifications were received at the selected time
            </h1>
          ) : (
            <table>
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
                {notifsDisplay.map(
                  (n) => (
                    // typeof n.notif === 'object' ? (
                    <tr key={n._id}>
                      <td>
                        <p className={n.new === true ? 'new ' : ''}>
                          {moment(n.occurred).format('MMMM Do YYYY')}
                        </p>
                      </td>
                      <td>
                        {n.action === 'liked post' && (
                          <p
                            className={
                              n.new === true
                                ? 'new notification'
                                : 'notification'
                            }
                          >
                            {/* {n.notif.likes.length > 1
                            ? n.notif.likes[
                                n.notif.likes.length - 1
                              ].email.split('@')[0]
                            : n.notif.likes[0].email.split('@')[0]}{' '} */}
                            Someone liked your{' '}
                            <span className='link' onClick={() => viewNotif(n)}>
                              post
                            </span>
                          </p>
                        )}
                        {n.action === 'commented post' && (
                          <p
                            className={
                              n.new === true
                                ? 'new notification'
                                : 'notification'
                            }
                            onClick={() => viewNotif(n)}
                          >
                            {/* {n.notif.comments.length > 1
                            ? n.notif.comments[
                                n.notif.comments.length - 1
                              ].postedBy.email.split('@')[0]
                            : n.notif.comments[0].postedBy.email.split(
                                '@'
                              )[0]}{' '} */}
                            Someone commented on your post
                          </p>
                        )}
                        {n.action === 'new event' && (
                          <p
                            className={
                              n.new === true
                                ? 'new notification'
                                : 'notification'
                            }
                            onClick={() => viewNotif(n)}
                          >
                            You have been invited to an event
                          </p>
                        )}
                        {n.action === 'user liked you' && (
                          <p
                            className={
                              n.new === true
                                ? 'new notification'
                                : 'notification'
                            }
                            onClick={() => viewNotif(n)}
                          >
                            You have a new follower
                          </p>
                        )}
                        {n.action === 'user visited you' && (
                          <p
                            className={
                              n.new === true
                                ? 'new notification'
                                : 'notification'
                            }
                            onClick={() => viewNotif(n)}
                          >
                            You received a new visitor
                          </p>
                        )}
                      </td>
                    </tr>
                  )
                  // ) : (
                  //   <tr key={n._id}>
                  //     <td>
                  //       <p className={n.new === true ? 'new' : ''}>
                  //         {moment(n.occurred).format('MMMM Do YYYY')}
                  //       </p>
                  //     </td>
                  //     <td>
                  //       <p className={n.new === true ? 'new' : ''}>
                  //         Someone interacted with your{' '}
                  //         <span className='link' onClick={() => viewNotif(n)}>
                  //           post
                  //         </span>
                  //       </p>
                  //     </td>
                  //   </tr>
                  // )
                )}
              </tbody>
            </table>
          )}
        </div>
        <AddComment
          commentModalIsOpen={commentModalIsOpen}
          setCommentModalIsOpen={setCommentModalIsOpen}
          comment={comment}
          setComment={setComment}
          uploading={uploading}
          addComment={addComment}
          image={image}
          handleImage={handleImage}
          loadingImg={loadingImg}
        />
        <NotifPost
          notifModalIsOpen={notifModalIsOpen}
          setNotifModalIsOpen={setNotifModalIsOpen}
          post={post}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          handleComment={handleComment}
          removeComment={removeComment}
          handleDelete={handleDelete}
          postDeleteModalIsOpen={postDeleteModalIsOpen}
          setPostDeleteModalIsOpen={setPostDeleteModalIsOpen}
          postToDelete={postToDelete}
          commentDeleteModalIsOpen={commentDeleteModalIsOpen}
          setCommentDeleteModalIsOpen={setCommentDeleteModalIsOpen}
          commentToDelete={commentToDelete}
          postOfCommentToDelete={postOfCommentToDelete}
          editComment={editComment}
          commentEditModalIsOpen={commentEditModalIsOpen}
          setCommentEditModalIsOpen={setCommentEditModalIsOpen}
          commentToEdit={commentToEdit}
          postOfCommentToEdit={postOfCommentToEdit}
          fetchNotifications={fetchNotifications}
          populateNotifications={populateNotifications}
          // notifToDelete={notifToDelete}
          // setNotifToDelete={setNotifToDelete}
          acceptInvite={acceptInvite}
          maybe={maybe}
          declineInvite={declineInvite}
          loading={loading}
          reportComment={reportComment}
          commentReportModalIsOpen={commentReportModalIsOpen}
          setCommentReportModalIsOpen={setCommentReportModalIsOpen}
          commentToReport={commentToReport}
          postOfCommentToReport={postOfCommentToReport}
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Notifications;
