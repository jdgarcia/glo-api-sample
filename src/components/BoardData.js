import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const BoardData = ({ boardData }) => {
  if (!boardData) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const labelCounts = {};
  boardData.cards.forEach((card) => {
    if (card.labels) {
      card.labels.forEach((label) => {
        labelCounts[label.id] = (labelCounts[label.id] || 0) + 1;
      })
    }
  });

  let maxCount = 0;
  for (let id in labelCounts) {
    const count = labelCounts[id];
    if (count) {
      maxCount = Math.max(maxCount, count);
    }
    else {
      delete labelCounts[id];
    }
  }

  const data = boardData.labels.map((label) => ({
    name: label.name,
    count: labelCounts[label.id]
  }));

  return (
    <RadarChart outerRadius={300} width={1900} height={700} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <PolarRadiusAxis angle={90} domain={[0, Math.max(3, boardData.cards.length)]} />
      <Radar name="# of Cards" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
    </RadarChart>
  )
};

const mapStateToProps = (state) => ({
  boardData: state.boardData
});

export default connect(mapStateToProps)(BoardData);
