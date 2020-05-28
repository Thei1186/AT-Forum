import {Category} from "../../src/models/category";
import {Topic} from "../../src/models/topic";
import {User} from "../../src/models/user";
import {Comment} from "../../src/models/comment";
import {Role} from "../../src/models/role";

export class DataTestHelper {

    user1: User = {
        uid: 'u1',
        username: 'davezz',
        name: 'dave',
        photoURL: '',
        email: 'davezzsi@email.com'
    };

    user2: User = {
        uid: '',
        username: 'Davvvyy',
        name: 'John',
        photoURL: '',
        email: 'davyyy@email.com'
    };

    user3: User = {
        uid: 'u1',
        username: 'NotDavezz',
        name: 'dave',
        photoURL: '',
        email: ''
    };

    user4: User = {
        uid: 'u1',
        username: 'NotDavezz',
        name: 'dave',
        photoURL: '',
        email: 'davi@email.com'
    };

    role1: Role = {
        roleName: 'admin',
        uid: 'r1'
    };

    role2: Role = {
        roleName: 'user',
        uid: ''
    };

    comment1: Comment = {
        message: 'Yaay cake',
        id: 'com1',
        topicId: 't1',
        author: this.user1
    };

    comment2: Comment = {
        message: 'Ya',
        id: 'com2',
        topicId: 't2',
        author: this.user1
    };

    comment3: Comment = {
        message: 'Ya',
        id: 'com2',
        topicId: 't3',
        author: this.user1
    };

    topic1: Topic = {
        categoryId: 'c1',
        id: 't1',
        description: 'yum',
        topicName: 'sweet',
        author: this.user1,
    };

    topic2: Topic = {
        categoryId: 'c1',
        id: 't2',
        description: 'haha',
        topicName: 'we',
        author: this.user1,
    };

    topic3: Topic = {
        categoryId: 'c1',
        id: 't3',
        description: 'haha',
        topicName: 'we',
        author: this.user1,
    };

    topic4: Topic = {
        categoryId: 'c1',
        id: 't3',
        description: 'ha',
        topicName: 'w',
        author: this.user1,
    };

    category1: Category = {
        categoryName: 'Cakes',
        id: 'c1',
        description: 'yummy',
    };

    category2: Category = {
        categoryName: 'Cakes',
        id: '',
        description: 'yummy',
    };


}
