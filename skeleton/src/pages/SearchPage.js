
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import SearchAlbum from '../components/SearchAlbum'; 
import '../components/SearchAlbum.css';
import SearchUser from '../components/SearchUser';
import Navbar from '../components/Navbar';

const SearchPage = () => {
  return ( 
    <div className="search-page">
      <Navbar />
      <SearchAlbum />
      <SearchUser />
    </div>
  );
}
 
export default SearchPage;