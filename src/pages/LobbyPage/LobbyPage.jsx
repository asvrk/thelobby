import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LobbyPage.scss';
import { Accordion } from 'react-bootstrap';
import Loading from '../../components/Loading';
import { FaFilter } from 'react-icons/fa';

const LobbyPage = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);

  const [selectedGender, setSelectedGender] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');

  const [genderOptions, setGenderOptions] = useState([]);
  const [bloodGroupOptions, setBloodGroupOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const allGenders = users.map((user) => user.gender);
      const uniqueGenders = new Set(allGenders);
      const genders = Array.from(uniqueGenders);
      const allBloodGroups = users.map((user) => user.bloodGroup);
      const uniqueBloodGroups = new Set(allBloodGroups);
      const bloodGroups = Array.from(uniqueBloodGroups);
      setGenderOptions(genders);
      setBloodGroupOptions(bloodGroups);
    }
  }, [users]);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleBloodGroupChange = (event) => {
    setSelectedBloodGroup(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const searchDetails = `${user.firstName} ${user.lastName} ${user.email} `;
    return (
      searchDetails.toLowerCase().includes(inputValue.toLowerCase()) &&
      (!selectedGender || user.gender === selectedGender) &&
      (!selectedBloodGroup || user.bloodGroup === selectedBloodGroup)
    );
  });

  return (
    <section className='container'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Accordion defaultActiveKey='0' className='mt-3 filterSection'>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                <FaFilter className='filterIcon' />
                Filters
              </Accordion.Header>
              <Accordion.Body className='row filterFields'>
                <div className='form-group col-md-3'>
                  <label htmlFor='gender'>Gender:</label>
                  <select
                    className='form-control'
                    id='gender'
                    value={selectedGender}
                    onChange={handleGenderChange}
                  >
                    <option value=''>All</option>
                    {genderOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='form-group col-md-3'>
                  <label htmlFor='bloodGroup'>Blood Group:</label>
                  <select
                    className='form-control'
                    id='bloodGroup'
                    value={selectedBloodGroup}
                    onChange={handleBloodGroupChange}
                  >
                    <option value=''>All</option>
                    {bloodGroupOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className='lobbyData'>
            <div className=' mt-3 mb-3 tableTopSection'>
              <div className='row'>
                <div className='col-md-3 d-flex align-items-center'>
                  <h4>User List</h4>
                </div>

                <div className='col-md-3 offset-md-6'>
                  <input
                    className='form-control table'
                    type='text'
                    placeholder='Search'
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className='dataHead'>
              <div>Name</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Gender</div>
              <div>Blood Group</div>
            </div>
            {filteredUsers.length > 0 ? (
              <div className='dataBody'>
                {filteredUsers.map((user) => (
                  <div key={user.id} className='userRow'>
                    <div>
                      <div>
                        <img
                          className='userImg'
                          src={user.image}
                          alt={user.firstName + ' ' + user.lastName}
                        />
                        <span className='fullName'>
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className='responsiveLabels'>Email</div>
                      {user.email}
                    </div>
                    <div>
                      <div className='responsiveLabels'>Phone</div>
                      {user.phone}
                    </div>
                    <div>
                      <div className='responsiveLabels'>Gender</div>
                      {user.gender}
                    </div>
                    <div>
                      <div className='responsiveLabels'>Blood Group</div>
                      {user.bloodGroup}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='dataBody'>
                <div className='userRow'>
                  <div>No data found!</div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default LobbyPage;
