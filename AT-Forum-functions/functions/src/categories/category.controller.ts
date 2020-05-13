import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";


export interface CategoryController {

    updateCategoryTopics(snap: DocumentSnapshot, context: EventContext): Promise<void>;

  //  deleteCategory(snap: DocumentSnapshot, context: EventContext): Promise<Category>;
}
