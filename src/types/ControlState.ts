export type ControlState = {
  speed: number;
  maxGen: number;
};

export type ControlAction = {
  type: string;
  payload: number;
};
