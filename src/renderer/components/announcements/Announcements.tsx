import React, { useEffect, useState } from 'react';
import "./Announcements.css";
import axios from 'axios';

interface Announcement {
  announcement: string,
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);


  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await axios.get<Announcement[]>('http://localhost:8080/api/announcements', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
        },
      });

      setAnnouncements(response.data);
    };

    fetchAnnouncements();

    console.log(announcements);
  }, []);

  return (
    <div id="announcements-wrapper">
      <h1>Announcements</h1>
      <div>---</div>
      {announcements.map((announcement, index) => (
        <div key={index}>{announcement.announcement}</div>
      ))}
    </div>
  );
}

export default Announcements;
