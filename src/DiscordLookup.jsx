import React, { useState } from "react";
import './DiscordLookup.css';

const DiscordLookup = () => {
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState(null);
    const [invalidId, setInvalidId] = useState(false);

    const handleInputChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://discordlookup.mesavirep.xyz/v1/user/${userId}`
            );
            const data = await response.json();

            if (data.id) {
                if (data.tag && data.tag.match(/#\d$/)) {
                    data.tag = data.tag.replace(/#\d$/, "");
                }
                setUserData(data);
                setInvalidId(false);
            } else {
                setUserData(null);
                setInvalidId(true);
            }

            console.log(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des données de l'utilisateur Discord", error);
            setUserData(null);
            setInvalidId(true);
        }
    };

    const formattedDate = userData?.created_at
        ? new Date(userData.created_at).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Non disponible";

    const divStyle = {
        borderColor: userData?.banner?.color || "white",
    };

    return (
        <main>
            <h1>Recherche d'utilisateur discord</h1>
            <input type="text" value={userId} onChange={handleInputChange} placeholder="Id de l'utilisateur" />
            <button onClick={handleSearch}>Chercher</button>

            {invalidId ? (
                <h2>ID d'utilisateur non valide</h2>
            ) : (
                userData && (
                    <article>
                        <p>ID d'utilisateur : {userData.id}</p>
                        <p>
                            Pseudo : {userData.global_name} |{" "}
                            {userData.tag}
                        </p>
                        <img src={userData.avatar.link} alt={userData.tag} style={divStyle} />
                        <p>Créé le {formattedDate} </p>
                    </article>
                )
            )}
        </main>
    );
};

export default DiscordLookup;
