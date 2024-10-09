const statusColors = {
  'damaged': '#ff5733',
  'completed': '#33a02c',
  'in_construction': '#b2df8a',
  'planning': '#1f78b4',
  'projected': '#a6cee3',
  'unverified': '#000000',
  'deselected': '#888',
};

const statusOptions = Object.keys(statusColors)
                            .filter(status => status !== 'deselected');

export { statusOptions, statusColors };
export default statusColors;
