import { bins } from '../data/db.js';

export const getBins = (req, res) => {
  try {
    res.status(200).json(bins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching local bins", error: error.message });
  }
};
