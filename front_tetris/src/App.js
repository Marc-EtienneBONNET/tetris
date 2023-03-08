
import { allPages } from './data/allPage';
import { useSelector, useDispatch} from 'react-redux'


function App() {
  let value = useSelector((state) => state.pages.value);
  


  return (
      <div>
          {allPages[value]}
      </div>
  );
}


export default App;
