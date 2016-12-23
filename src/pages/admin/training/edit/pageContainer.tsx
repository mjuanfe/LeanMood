import { EditTrainingPage } from './page';
import { connect } from 'react-redux';
import { IAppState } from '../../../../reducers';
import { editTrainingRequestStarted } from './action/editTrainingRequest';

const mapStateToProps = (state: IAppState) => {
    return {
        editTraining: state.adminTraining.editTraining
    }        
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTraining: (id: number) => dispatch(editTrainingRequestStarted(id)),
    }
};

export const EditTrainingPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTrainingPage);
