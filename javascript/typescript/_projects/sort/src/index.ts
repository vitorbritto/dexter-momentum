import { NumbersCollection } from './NumbersCollection';
import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';

const numbersCollection = new NumbersCollection([10,-2,4,5,-6]);
numbersCollection.sort();
console.log(numbersCollection.data);

const charsCollection = new CharactersCollection('qwerasdfghjtyui');
charsCollection.sort();
console.log(charsCollection.data);

const linkedList = new LinkedList();
linkedList.add(-500);
linkedList.add(10);
linkedList.add(-5);
linkedList.add(50);
linkedList.sort();
linkedList.print();