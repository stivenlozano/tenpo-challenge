import { IndicatorProps } from '../../types';
import './IndicatorComponent.css'

const IndicatorComponent = ({ percentage, size = 10, strokeWidth = 10 }: IndicatorProps) => {
   const radius = (size - strokeWidth) / 2;
   const circumference = 2 * Math.PI * radius;
   const strokeDashoffset = circumference - (circumference * percentage) / 100;

   return (
      <div className="circle-container">
         <svg className="circle-svg" width={size} height={size}>
            <circle className="bg" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
            <circle
               className="progress"
               cx={size / 2}
               cy={size / 2}
               r={radius}
               strokeWidth={strokeWidth}
               style={{
                  strokeDasharray: circumference,
                  strokeDashoffset
               }}
            />
         </svg>
         <div className="circle-text">
            {percentage}%
         </div>
      </div>
   );
};

export default IndicatorComponent;