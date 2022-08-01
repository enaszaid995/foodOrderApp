import { Fragment } from "react";
import MealItems from "./MealItems";
import MealSummary from "./MealSummary";
const Meal = () =>{
 return  <Fragment>
            <MealSummary/>
            <MealItems/>
    </Fragment>

};
export default Meal;