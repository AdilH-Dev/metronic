import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeenIcon } from '@/components';
import { CardConnection, CardConnectionRow } from '@/partials/cards';
const NetworkUserCardsTeamCrewContent = () => {
  const [activeTab, setActiveTab] = useState('cards');
  const handleTabClick = tab => {
    setActiveTab(tab);
  };
  const items = [{
    name: 'Jenny Klabber',
    info: 'Pinnacle Innovate',
    avatar: {
      className: 'size-20 relative',
      image: '300-1.png',
      imageClass: 'rounded-full',
      badgeClass: 'flex size-2.5 bg-success rounded-full absolute bottom-0.5 left-16 transform -translate-y-1/2'
    },
    email: 'kevin@pinnacle.com',
    team: {
      size: 'size-7',
      group: [{
        filename: '300-4.png'
      }, {
        filename: '300-1.png'
      }, {
        filename: '300-2.png'
      }],
      more: {
        number: 10,
        variant: 'text-success-inverse ring-success-light bg-success'
      }
    },
    statistics: [{
      total: '92',
      description: 'Purchases'
    }, {
      total: '$69',
      description: 'Avg. Price'
    }, {
      total: '$6,240',
      description: 'Total spent'
    }],
    connected: true
  }, {
    name: 'Sarah Johnson',
    info: 'InnovateX',
    avatar: {
      className: 'flex items-center justify-center relative text-2.5xl text-info size-20 ring-1 ring-info-clarity bg-info-light rounded-full',
      fallback: 'S',
      badgeClass: 'flex size-2.5 bg-success rounded-full absolute bottom-0.5 left-16 transform -translate-y-1/2'
    },
    email: 'sarahj@innx.com',
    team: {
      size: 'size-7',
      group: [{
        filename: '300-5.png'
      }, {
        filename: '300-6.png'
      }, {
        filename: '300-7.png'
      }, {
        filename: '300-11.png'
      }]
    },
    statistics: [{
      total: '123',
      description: 'Purchases'
    }, {
      total: '$30',
      description: 'Avg. Price'
    }, {
      total: '$3,713',
      description: 'Total spent'
    }],
    connected: false
  }, {
    name: 'Kevin Wang',
    info: 'Pinnacle Innovate',
    avatar: {
      className: 'flex items-center justify-center relative text-2.5xl text-danger size-20 ring-1 ring-danger-clarity bg-danger-light rounded-full',
      fallback: 'K',
      badgeClass: 'flex size-2.5 bg-success rounded-full absolute bottom-0.5 left-16 transform -translate-y-1/2'
    },
    email: 'kevin@pinnacle.com',
    team: {
      size: 'size-7',
      group: [{
        filename: '300-29.png'
      }, {
        filename: '300-33.png'
      }, {
        filename: '300-23.png'
      }, {
        filename: '300-31.png'
      }]
    },
    statistics: [{
      total: '30',
      description: 'Purchases'
    }, {
      total: '$150',
      description: 'Avg. Price'
    }, {
      total: '$4,500',
      description: 'Total spent'
    }],
    connected: true
  }, {
    name: 'Brian Davis',
    info: 'Vortex Tech',
    avatar: {
      className: 'size-20 relative',
      image: '300-9.png',
      imageClass: 'rounded-full',
      badgeClass: 'flex size-2.5 bg-success rounded-full absolute bottom-0.5 left-16 transform -translate-y-1/2'
    },
    email: 'brian@vortextech.com',
    team: {
      size: 'size-7',
      group: [{
        filename: '300-14.png'
      }, {
        filename: '300-3.png'
      }, {
        filename: '300-19.png'
      }, {
        filename: '300-15.png'
      }]
    },
    statistics: [{
      total: '87',
      description: 'Purchases'
    }, {
      total: '$22',
      description: 'Avg. Price'
    }, {
      total: '$1958',
      description: 'Total spent'
    }],
    connected: true
  }, {
    name: 'Megan Taylor',
    info: 'Catalyst',
    avatar: {
      className: 'flex items-center justify-center relative text-2.5xl text-success size-20 ring-1 ring-success-clarity bg-success-light rounded-full',
      fallback: 'M',
      badgeClass: 'flex size-2.5 bg-gray-400 rounded-full absolute bottom-0.5 left-16 transform -translate-y-1/2'
    },
    email: 'megan@catalyst.com',
    team: {
      size: 'size-7',
      group: [{
        filename: '300-5.png'
      }, {
        filename: '300-26.png'
      }, {
        filename: '300-6.png'
      }, {
        filename: '300-1.png'
      }]
    },
    statistics: [{
      total: '45',
      description: 'Purchases'
    }, {
      total: '$300',
      description: 'Avg. Price'
    }, {
      total: '$13,500',
      description: 'Total spent'
    }],
    connected: false
  }, {
    name: 'Alex Martinez',
    info: 'Precision Solutions',
    avatar: {
      className: 'size-20 relative',
      image: '300-8.png',
      imageClass: 'rounded-full',
      badgeClass: 'flex size-2.5 bg-success rounded-full absolute bottom-0.5 left-16 transform -translate-y-1/2'
    },
    email: 'alex@kteam.com',
    team: {
      size: 'size-7',
      group: [{
        filename: '300-4.png'
      }, {
        filename: '300-5.png'
      }, {
        filename: '300-11.png'
      }],
      more: {
        number: 10,
        variant: 'text-success-inverse ring-success-light bg-success'
      }
    },
    statistics: [{
      total: '63',
      description: 'Purchases'
    }, {
      total: '$65',
      description: 'Avg. Price'
    }, {
      total: '$4,095',
      description: 'Total spent'
    }],
    connected: true
  }];
  const renderItem = (item, index) => <CardConnection name={item.name} info={item.info} avatar={item.avatar} email={item.email} team={item.team} statistics={item.statistics} connected={item.connected} key={index} />;
  const renderRowItem = (item, index) => <CardConnectionRow name={item.name} info={item.info} avatar={item.avatar} email={item.email} team={item.team} statistics={item.statistics} connected={item.connected} key={index} />;
  return <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      <div className="flex flex-wrap items-center gap-5 justify-between">
        <h3 className="text-md text-gray-900 font-medium">Showing {items.length} Users</h3>

        <div className="flex items-center flex-wrap gap-5">
          <div className="flex items-center gap-2.5">
            <select className="select select-sm w-28">
              <option value="1">Active</option>
              <option value="2">Disabled</option>
              <option value="2">Pending</option>
            </select>

            <select className="select select-sm w-28">
              <option value="1">Latest</option>
              <option value="2">Older</option>
              <option value="3">Oldest</option>
            </select>

            <button className="btn btn-sm btn-outline btn-primary">
              <KeenIcon icon="setting-4" /> Filters
            </button>
          </div>

          <div className="flex">
            <label className="input input-sm">
              <KeenIcon icon="magnifier" />
              <input placeholder="Type name, team" type="text" value="" readOnly />
            </label>
          </div>

          <div className="btn-tabs btn-tabs-sm" data-tabs="true">
            <a href="#" className={`btn btn-icon ${activeTab === 'cards' ? 'active' : ''}`} onClick={() => handleTabClick('cards')} data-tab-toggle="#team_crew_card">
              <KeenIcon icon="category" />
            </a>
            <a href="#" className={`btn btn-icon ${activeTab === 'list' ? 'active' : ''}`} onClick={() => handleTabClick('list')} data-tab-toggle="#team_crew_list">
              <KeenIcon icon="row-horizontal" />
            </a>
          </div>
        </div>
      </div>

      {activeTab === 'cards' ? <div id="team_crew_card" className="flex flex-col gap-5 lg:gap-7.5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
            {items.map((item, index) => {
          return renderItem(item, index);
        })}
          </div>

          <div className="flex justify-center">
            <Link to="/public-profile/projects/3-columns" className="btn btn-link">
              Show more projects
            </Link>
          </div>
        </div> : <div id="team_crew_list">
          <div className="grid grid-cols-1 gap-5 lg:gap-7.5">
            {items.map((item, index) => {
          return renderRowItem(item, index);
        })}
          </div>

          <div className="flex grow justify-center pt-5 lg:pt-7.5">
            <Link to="/account/members/team-members" className="btn btn-link">
              Show more Users
            </Link>
          </div>
        </div>}
    </div>;
};
export { NetworkUserCardsTeamCrewContent };