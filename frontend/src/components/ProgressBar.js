// Progress bar component (simple percentage display)
const ProgressBar = ({ progress }) => (
    <div style={{ backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden', width: '100%', height: '20px' }}>
        <div style={{
            width: `${progress}%`,
            backgroundColor: '#4caf50',
            height: '100%',
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold'
        }}>
            {progress}%
        </div>
    </div>
);

export default ProgressBar;