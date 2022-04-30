const _=require('underscore')
const express = require("express");
const app = express();
var router = express.Router();
const Product = require('../../models/productModel')

const MAX_ITERATIONS = 50;

function randomBetween(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    );
}

function calcMeanCentroid(dataSet, start, end) {
    const features = dataSet[0].length;
    const n = end - start;
    let mean = [];
    for (let i = 0; i < features; i++) {
        mean.push(0);
    }
    for (let i = start; i < end; i++) {
        for (let j = 0; j < features; j++) {
            mean[j] = mean[j] + dataSet[i][j] / n;
        }
    }
    return mean;
}

function getRandomCentroidsNaiveSharding(dataset, k) {
    // implementation of a variation of naive sharding centroid initialization method
    // (not using sums or sorting, just dividing into k shards and calc mean)
    // https://www.kdnuggets.com/2017/03/naive-sharding-centroid-initialization-method.html
    const numSamples = dataset.length;
    // Divide dataset into k shards:
    const step = Math.floor(numSamples / k);
    const centroids = [];
    for (let i = 0; i < k; i++) {
        const start = step * i;
        let end = step * (i + 1);
        if (i + 1 === k) {
            end = numSamples;
        }
        centroids.push(calcMeanCentroid(dataset, start, end));
    }
    return centroids;
}

function getRandomCentroids(dataset, k) {
    // selects random points as centroids from the dataset
    const numSamples = dataset.length;
    const centroidsIndex = [];
    let index;
    while (centroidsIndex.length < k) {
        index = randomBetween(0, numSamples);
        if (centroidsIndex.indexOf(index) === -1) {
            centroidsIndex.push(index);
        }
    }
    const centroids = [];
    for (let i = 0; i < centroidsIndex.length; i++) {
        const centroid = [...dataset[centroidsIndex[i]]];
        centroids.push(centroid);
    }
    return centroids;
}

function compareCentroids(a, b) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

function shouldStop(oldCentroids, centroids, iterations) {
    if (iterations > MAX_ITERATIONS) {
        return true;
    }
    if (!oldCentroids || !oldCentroids.length) {
        return false;
    }
    let sameCount = true;
    for (let i = 0; i < centroids.length; i++) {
        if (!compareCentroids(centroids[i], oldCentroids[i])) {
            sameCount = false;
        }
    }
    return sameCount;
}

// Calculate Squared Euclidean Distance
function getDistanceSQ(a, b) {
    const diffs = [];
    for (let i = 0; i < a.length; i++) {
        diffs.push(a[i] - b[i]);
    }
    return diffs.reduce((r, e) => (r + (e * e)), 0);
}

// Returns a label for each piece of data in the dataset. 
function getLabels(dataSet, centroids) {
    // prep data structure:
    const labels = {};
    for (let c = 0; c < centroids.length; c++) {
        labels[c] = {
            points: [],
            centroid: centroids[c],
        };
    }
    // For each element in the dataset, choose the closest centroid.
    // Make that centroid the element's label.
    for (let i = 0; i < dataSet.length; i++) {
        const a = dataSet[i];
        let closestCentroid, closestCentroidIndex, prevDistance;
        for (let j = 0; j < centroids.length; j++) {
            let centroid = centroids[j];
            if (j === 0) {
                closestCentroid = centroid;
                closestCentroidIndex = j;
                prevDistance = getDistanceSQ(a, closestCentroid);
            } else {
                // get distance:
                const distance = getDistanceSQ(a, centroid);
                if (distance < prevDistance) {
                    prevDistance = distance;
                    closestCentroid = centroid;
                    closestCentroidIndex = j;
                }
            }
        }
        // add point to centroid labels:
        labels[closestCentroidIndex].points.push(a);
    }
    return labels;
}

function getPointsMean(pointList) {
    const totalPoints = pointList.length;
    const means = [];
    for (let j = 0; j < pointList[0].length; j++) {
        means.push(0);
    }
    for (let i = 0; i < pointList.length; i++) {
        const point = pointList[i];
        for (let j = 0; j < point.length; j++) {
            const val = point[j];
            means[j] = means[j] + val / totalPoints;
        }
    }
    return means;
}

function recalculateCentroids(dataSet, labels, k) {
    // Each centroid is the geometric mean of the points that
    // have that centroid's label. Important: If a centroid is empty (no points have
    // that centroid's label) you should randomly re-initialize it.
    let newCentroid;
    const newCentroidList = [];
    for (const k in labels) {
        const centroidGroup = labels[k];
        if (centroidGroup.points.length > 0) {
            // find mean:
            newCentroid = getPointsMean(centroidGroup.points);
        } else {
            // get new random centroid
            newCentroid = getRandomCentroids(dataSet, 1)[0];
        }
        newCentroidList.push(newCentroid);
    }
    return newCentroidList;
}

function kmeans(dataset, k, useNaiveSharding = true) {
    if (dataset.length && dataset[0].length && dataset.length > k) {
        // Initialize book keeping variables
        let iterations = 0;
        let oldCentroids, labels, centroids;

        // Initialize centroids randomly
        if (useNaiveSharding) {
            centroids = getRandomCentroidsNaiveSharding(dataset, k);
        } else {
            centroids = getRandomCentroids(dataset, k);
        }

        // Run the main k-means algorithm
        while (!shouldStop(oldCentroids, centroids, iterations)) {
            // Save old centroids for convergence test.
            oldCentroids = [...centroids];
            iterations++;

            // Assign labels to each datapoint based on centroids
            labels = getLabels(dataset, centroids);
            centroids = recalculateCentroids(dataset, labels, k);
        }

        const clusters = [];
        for (let i = 0; i < k; i++) {
            clusters.push(labels[i]);
        }
        const results = {
            clusters: clusters,
            centroids: centroids,
            iterations: iterations,
            converged: iterations <= MAX_ITERATIONS,
        };
        return results;
    } else {
        throw new Error('Invalid dataset');
    }
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}

/*
    //age, sex(0-1), nationality(0-1), premium(0-1)
    [18, 0, 1, 0],
    [51, 0, 1, 1],
    [23, 1, 0, 1],
    [14, 0, 1, 0],
    [16, 1, 0, 0],
    [45, 0, 1, 0],
    [20, 1, 0, 1],
    [16, 0, 0, 0],
    [12, 1, 1, 0]
    [41, 1, 1, 1]
 */
router.post('/', (req,res)=>{
let data = [
    //age, sex(0-1), nationality(0-1), premium(0-1)
    //23,0,1,0
    [18, 0, 1, 0],
    [51, 0, 1, 1],
    [23, 1, 0, 1],
    [14, 0, 1, 0],
    [16, 1, 0, 0],
    [45, 0, 1, 0],
    [20, 1, 0, 1],
    [16, 0, 0, 0],
    [12, 1, 1, 0],
    [41, 1, 1, 1]
]
let categories=[1,2,1,3,1,2,1,1,3,2]
    //age, sex(0-1), nationality(0-1), premium(0-1)
let our_user= [getAge(req.body.birthday), parseInt(req.body.sexe), parseInt(req.body.nationality), parseInt(req.body.premium)]
data.push(our_user)

let result=kmeans(data,2)
let main_cluster=result.clusters[1].points
for(let i =0 ; i<result.clusters[0].points.length;i++){
    if (_.isEqual(result.clusters[0].points[i],our_user) ){
        main_cluster=result.clusters[0].points
    }
}
let cat_1 =0;
let cat_2 =0;
let cat_3 =0;
for(let i=0; i<main_cluster.length-1;i++){
    for(let j=0; j<data.length-1; j++){
        if(_.isEqual(main_cluster[i],data[j])){
            switch (categories[j]){
                case 1:
                    cat_1++
                    break
                case 2:
                    cat_2++
                    break
                default:
                    cat_3++
                    break
            }
        }
    }
}
let max = cat_1;
let cat='sports'
if (cat_2>max){
    max=cat_2
    cat='gaming'
}
if (cat_3>max){
    cat='household'
}
Product.find({productCategory:cat}).limit(4).then(products=>{
    res.status(200)
    res.send({'category':cat,'products':products})
})

})

module.exports = router;