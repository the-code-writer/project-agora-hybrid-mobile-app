// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START order_and_start_modular]
import { query, orderBy, startAt } from "firebase/firestore";  

const q = query(citiesRef, orderBy("population"), startAt(1000000));
// [END order_and_start_modular]