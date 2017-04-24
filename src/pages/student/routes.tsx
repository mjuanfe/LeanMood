import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { TrainingTOCPageContainer } from './training/toc/pageContainer';
import { TrainingListPage } from './training/list/page';
import { studentRouteEnums } from '../../common/routeEnums/student';
import { ExerciseAssessmentPage } from './training/exercise/assessment/page';
import { ExerciseDeliveryPage } from './training/exercise/delivery/page';

// http://stackoverflow.com/questions/35048738/react-router-import-routes
// AssembliesRoutes.js
// http://randycoulman.com/blog/2016/02/02/composing-routes-in-react-router/
export const StudentsRoutes = (
  <div>
    <Route path={studentRouteEnums.training.list} component={TrainingListPage} />
    <Route path={studentRouteEnums.training.id.toc} component={TrainingTOCPageContainer} />

    <Redirect from={studentRouteEnums.default} to={studentRouteEnums.training.list} />
    <Redirect from={studentRouteEnums.training.base} to={studentRouteEnums.training.list} />
    <Redirect from={studentRouteEnums.training.id.base} to={studentRouteEnums.training.id.toc} />

    {/* Mocked links */}
    <Route path="/student/training/1/exercise/1/delivery" component={ExerciseDeliveryPage} />
    <Route path="/student/training/1/exercise/2/delivery" component={ExerciseDeliveryPage} />
    <Route path="/student/training/1/exercise/3/delivery" component={ExerciseDeliveryPage} />
    <Route path={`${studentRouteEnums.training.base}/1/exercise`} component={ExerciseAssessmentPage} />
    <Route path={`${studentRouteEnums.training.base}/2/exercise`} component={ExerciseAssessmentPage} />
    <Route path={`${studentRouteEnums.training.base}/3/exercise`} component={ExerciseAssessmentPage} />
  </div>
);
