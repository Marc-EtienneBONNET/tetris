import { connect } from 'react-redux'
import { witchPage} from './data/page'
import { ACCUEIL } from './reducer/pagesReducer'

function App(state) {
  return (
      <div>
        {state.store.page}
      </div>
  );
}

const AppStore = connect(
  (state) => {
    return ({store: state});
  }
)(App)

export default AppStore;
