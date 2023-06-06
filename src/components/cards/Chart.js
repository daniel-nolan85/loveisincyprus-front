import React, { useState, useEffect } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { Bar, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Chart = ({ chartImage }) => {
  const [text, setText] = useState('');

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       await reRenderCurrentGraph();

  //       if (currentGraph && currentGraph === 'Date range') {
  //         setNumData(registrationNumGraph);
  //         setPerData(registrationPerGraph);
  //       }
  //     };
  //     fetchData();
  //     // if (currentGraph === 'Visiting frequency') visitationGraphs();
  //     // if (currentGraph === 'Gender') genderGraphs();
  //     // if (currentGraph === 'Height') heightGraphs();
  //     // if (currentGraph === 'Body shape') buildGraphs();
  //     // if (currentGraph === 'Hair colour') hairColourGraphs();
  //     // if (currentGraph === 'Hair Style') hairStyleGraphs();
  //     // if (currentGraph === 'Hair length') hairLengthGraphs();
  //     // if (currentGraph === 'Eye colour') eyeColourGraphs();
  //     // if (currentGraph === 'Feet type') feetTypeGraphs();
  //     // if (currentGraph === 'Marital status') maritalGraphs();
  //     // if (currentGraph === 'Location') locationGraphs();
  //     // if (currentGraph === 'Age range') ageGraphs();
  //     // if (currentGraph === 'Has children') childrenGraphs();
  //     // if (currentGraph === 'Lives with') livesWithGraphs();
  //     // if (currentGraph === 'Nationality') nationalityGraphs();
  //     // if (currentGraph === 'Languages') languageGraphs();
  //     // if (currentGraph === 'Ethnicity') ethnicityGraphs();
  //     // if (currentGraph === 'Music') musicGraphs();
  //     // if (currentGraph === 'Movies') moviesGraphs();
  //     // if (currentGraph === 'Religion') religionGraphs();
  //     // if (currentGraph === 'Occupation') occupationGraphs();
  //     // if (currentGraph === 'Education') educationGraphs();
  //     // if (currentGraph === 'Hobbies') hobbiesGraphs();
  //     // if (currentGraph === 'Books') booksGraphs();
  //     // if (currentGraph === 'Sports') sportsGraphs();
  //     // if (currentGraph === 'Smokes') smokesGraphs();
  //     // if (currentGraph === 'Drinks') drinksGraphs();
  //     // if (currentGraph === 'Food') foodGraphs();
  //     // if (currentGraph === 'How they treat themselves') treatsGraphs();
  //     // if (currentGraph === 'Dating purpose') relWantedGraphs();
  //     // if (currentGraph === '# Points') pointsGraphs();
  //     // if (currentGraph === '# Page visits of each item in the shop')
  //     //   productsViewedGraphs();
  //     // if (currentGraph === 'Total amount paid in shop') totalPaidGraphs();
  //     // if (currentGraph === '# Orders in shop') ordersGraphs();
  //     // if (currentGraph === 'Free keywords') keyWordsGraphs();
  //   }, [currentGraph]);

  return (
    <Document>
      <Page>
        {/* <Text>{currentGraph}</Text> */}
        <Image src={chartImage} />
      </Page>
    </Document>
  );
};

export default Chart;
