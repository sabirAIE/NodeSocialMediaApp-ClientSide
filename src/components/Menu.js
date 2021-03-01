import React, { useContext ,useState } from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import { AuthContext} from '../context/auth';

function MenuBar() {

    const { user, logout } = useContext(AuthContext);

    const pathName = window.location.pathname;
    
    const path = pathName ==='/' ? 'home' : pathName.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const menuBar = user ? (
      <Menu pointing secondary>
          <Menu.Item
            color = 'red'
            name ={ user.userName }
            active
            as ={Link}
            to ='/'

          />
          <Menu.Menu position='right'>
            <Menu.Item
              color = 'red'
                name='Logout'
                onClick={ logout }
            />
          </Menu.Menu>
      </Menu>
    ) : (
      <Menu pointing secondary>
          <Menu.Item
            color = 'red'
            name ='home'
            active ={activeItem === 'home'}
            onClick ={handleItemClick}
            as ={Link}
            to ='/'

          />
          <Menu.Menu position='right'>
            <Menu.Item
              color = 'red'
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to='/login'
            />
            <Menu.Item
              color = 'red'
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to='/register'
            />
          </Menu.Menu>
        </Menu>

    )
    return menuBar;
}

export default MenuBar;