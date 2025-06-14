//MongoDB Practice Task-2 (Aggregation tasks)
//Question: 1. Retrieve the count of individuals who are active (isActive: true) for each gender.
//Answer: 1
// db.massive_data.aggregate([
//     {$match : {isActive: true }}, 
//     {$group : {_id : "$gender", count : {$sum : 1}}}])

//Question: 2. Retrieve the names and email addresses of individuals who are active (`isActive: true`) and have a favorite fruit of "banana".
//Anser: 2
// db.massive_data.aggregate([
//     {$match: {isActive : true, favoriteFruit : "banana"}},
//     {$project : {_id : 0, name : 1, email: 1}}
//     {$project : {_id : 0, name : 1, email: 1, isActive: true, favoriteFruit : "banana"}}
//     ])

//Question: 3. Find the average age of individuals for each favorite fruit, then sort the results in descending order of average age.
//Answer: 3
// db.massive_data.aggregate([
//     {$group :{
//     _id : "$favoriteFruit",
//     average_Age : {$avg : "$age"}}},
//     {$sort : {average_age : -1}}
//     ])

//Question: 4. Retrieve a list of unique friend names for individuals who have at least one friend, 
//and include only the friends with names starting with the letter "W".
//Hints: Explore how to use regex [ "friends.name": /^W/]
//Answer: 4
// db.massive_data.aggregate([{$match: {
//     "friends.name" : {$regex : /^W/}}},
//     {"$unwind" : "$friends"},
//     {$match : {
//     "friends.name" : {$regex : /^W/}}},
//     {$group : {_id : null, uniquefriends : {$addToSet: "$friends.name"}}}
// ])

//Question: 5. Use $facet to separate individuals into two facets based on their age:
//those below 30 and those above 30. Then, within each facet,
//bucket the individuals into age ranges (e.g., 20-25, 26-30, etc.) 
//and sort them by age within each bucket.
//Answer: 5
// db.massive_data.aggregate([{$facet: {
//      "below30" : [{$match : {age : {$lt : 30}}},
//      {$bucket : {
//       groupBy : "$age",
//       boundaries : [20, 26, 30],
//       default : "unknown",
//       output : {
//           count : {$sum : 1},
//           users : {$push : "$name"}}}},
//           {$sort : {age : 1}}],
//     "above30" : [{$match : {age : {$gt : 30}}},
//     {$bucket : {
//     groupBy : "$age",
//     boundaries : [31, 36, 41],
//     default : "unknown",
//     output : {
//         count : {$sum : 1},
//         users : {$push : "$name"}}}}, 
//         {$sort : {age : 1}}]
//     }}])

//Question: 6. Calculate the total balance of individuals for each company 
// and display the company name along with the total balance. 
// Limit the result to show only the top two companies 
// with the highest total balance.
// Hints: Explore $slice, $split.

//Answer: 6
// db.massive_data.aggregate([{
//     $group : {
//     _id : "$company",
//     totalbalance : {$sum : {$toDouble: {$substr: [ "$balance", 1, -1 ]}}}}},
//     {$sort : {totalbalance : -1}},
//     {$limit : 2}
//     ])

















