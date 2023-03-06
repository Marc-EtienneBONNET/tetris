import { connect } from 'react-redux'


export function ComposantListeHistPure(state){

    function createListeHist(state){
        let hist =state.store.user.hist;
        return (<div>
            {hist.map((element) => {
                return (
                    <div key={element.id}>
                        <h3>id : {element.id} | nbPlayeur: {element.listePlayeur.length} | difficulte : {element.vitesse}</h3>
                    </div>
                );    
            })}
        </div>);
    }

    return <div>
        <h1>historique</h1>
        {createListeHist(state)}
    </div>
}

const ComposantListeHist = connect(
    (state) => {
        return {
            store: state,
        }
    }
)(ComposantListeHistPure)

export default ComposantListeHist;