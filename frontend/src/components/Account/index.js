import React from "react";

import "./Account.scss";

import MyAccount from './MyAccount';
import MemberAccount from './MemberAccount';

export const Account = () => {

    return (
        <>
            <p>
                Completează formularul zilnic de simptome care te
                ajută să menții un istoric al simptomelor sau al absenței acestora în perioada în care stai în izolare.
                Parcurge întrebările și răspunde cu atenție. Pe măsură ce completezi, această pagină se va popula cu istoricul răspunsurilor tale.
                Poți completa formularul aici.
        </p>
            <MyAccount />
            <MemberAccount />
        </>
    );
};

export default Account;
