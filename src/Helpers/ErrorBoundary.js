import React,{useState, useEffect} from "react";
import './styles.css';
const ErrorBoundary=({children})=>{
    const[error,setError]=useState(null);
    const [showLogs, setShowLogs] = useState(false);

    useEffect(() => {
        const handleError = (event) => {
          // Handle errors here
          setError(event.error || new Error('An error occurred'));
        };
      
        window.addEventListener('error', handleError);
      
        return () => {
          window.removeEventListener('error', handleError);
        };
      }, []);

    //  function that toggles the value of showLogs when the "Logs" button is clicked.
    const toggleLogs = () => {
        setShowLogs(!showLogs);
      };


    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">
                <span>Oops, something went wrong!</span>
                <br/>
                <button onClick={toggleLogs}>{showLogs ? 'Hide Logs' : 'Show Logs'}</button>
                {showLogs && (
                    <div className="error-logs">
                    {/* Display error logs here */}
                    <pre>{error.stack}</pre>
                    </div>
                )}
                </div>
      </div>
    );
                };
    return children;

}

export default ErrorBoundary;