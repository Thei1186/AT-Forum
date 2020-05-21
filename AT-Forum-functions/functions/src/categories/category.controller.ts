import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {Change, EventContext} from "firebase-functions";


export interface CategoryController {

    addTopicToCategoryTopics(snap: DocumentSnapshot, context: EventContext): Promise<void>;

    editCategoryTopics(change: Change<DocumentSnapshot>, context: EventContext): Promise<void>;

    removeTopicFromCategory(snap: DocumentSnapshot, context: EventContext): Promise<void>;
}
