
import { sendRequest } from "@/api/sendRequest";
import UserContext from "@/contexts/UserContext/UserContext";
import { useContext } from "react";

export async function Fetchuser() {

    const { token, setUserId, setTeamId, setWardId, setWardName, setMunicipalityId, setmunicipalityName } = useContext(UserContext);
    const [api_data_userDetails, setAPI_Data_userDetails] = useState([]);


    //Fetching user details
    const user_details_response = await sendRequest(
        "get",
        "/user-details",
        null,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (user_details_response.status === 1) {
        // console.log("User Details Response ::", user_details_response.data);
        setAPI_Data_userDetails(user_details_response.data);
    }

    useEffect(() => {
        // if (api_data_userDetails && Object.keys(api_data_userDetails).length > 0) {
        //   localStorage.setItem("user_id", api_data_userDetails.id);
        //   setUserId(api_data_userDetails.id)
        //   localStorage.setItem("team_id", api_data_userDetails.team_id);
        //   set
        //   localStorage.setItem("name", api_data_userDetails.name);
        //   setName(api_data_userDetails.name);
        // }

        // if (api_data_userDetails.ward) {
        //   localStorage.setItem("ward_id", api_data_userDetails.ward.id);
        //   localStorage.setItem("ward_name", api_data_userDetails.ward.name);
        //   setWard_name(api_data_userDetails.ward.name);
        // }

        // if (api_data_userDetails.team) {
        //   localStorage.setItem("team_number", api_data_userDetails.team.number);
        //   setTeam_num(api_data_userDetails.team.number);
        // }

        if (api_data_userDetails.municipality) {
            //   localStorage.setItem(
            //     "municipality_id",
            //     api_data_userDetails.municipality.id
            //   );

            //   localStorage.setItem(
            //     "municipality_name",
            //     api_data_userDetails.municipality.name
            //   );

            setmunicipalityName(api_data_userDetails.municipality.name)

        }

    }, [api_data_userDetails]);
}


