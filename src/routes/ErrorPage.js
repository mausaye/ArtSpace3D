import { useRouteError } from "react-router-dom";
import './ErrorPage.css';
import ErrorImage from "../1547870366.svg";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div class="error-page">
        <img src={ErrorImage} />
        <div class="error-details">
            <h1>
                {error.statusText || error.message}
            </h1>
        </div>
        <div class="error-message">
            <p>
                <i>We're so sorry, an unexpected error has occurred. Please contact us if the error persists.</i>
            </p>
        </div>
    </div>
  );
}