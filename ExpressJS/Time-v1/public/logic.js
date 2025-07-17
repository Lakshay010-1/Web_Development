document.addEventListener("DOMContentLoaded", async () => {

    let countryList = { "AF": "Afghanistan", "AL": "Albania", "DZ": "Algeria", "AS": "American Samoa", "AD": "Andorra", "AO": "Angola", "AI": "Anguilla", "AQ": "Antarctica", "AG": "Antigua and Barbuda", "AR": "Argentina", "AM": "Armenia", "AW": "Aruba", "AU": "Australia", "AT": "Austria", "AZ": "Azerbaijan", "BS": "Bahamas (the)", "BH": "Bahrain", "BD": "Bangladesh", "BB": "Barbados", "BY": "Belarus", "BE": "Belgium", "BZ": "Belize", "BJ": "Benin", "BM": "Bermuda", "BT": "Bhutan", "BO": "Bolivia ", "BQ": "Bonaire, Sint Eustatius and Saba", "BA": "Bosnia and Herzegovina", "BW": "Botswana", "BV": "Bouvet Island", "BR": "Brazil", "IO": "British Indian Ocean Territory ", "BN": "Brunei Darussalam", "BG": "Bulgaria", "BF": "Burkina Faso", "BI": "Burundi", "CV": "Cabo Verde", "KH": "Cambodia", "CM": "Cameroon", "CA": "Canada", "KY": "Cayman Islands ", "CF": "Central African Republic ", "TD": "Chad", "CL": "Chile", "CN": "China", "CX": "Christmas Island", "CC": "Cocos (Keeling) Islands ", "CO": "Colombia", "KM": "Comoros (the)", "CD": "Congo ", "CG": "Congo ", "CK": "Cook Islands ", "CR": "Costa Rica", "HR": "Croatia", "CU": "Cuba", "CW": "Curaçao", "CY": "Cyprus", "CZ": "Czechia", "CI": "Côte d'Ivoire", "DK": "Denmark", "DJ": "Djibouti", "DM": "Dominica", "DO": "Dominican Republic ", "EC": "Ecuador", "EG": "Egypt", "SV": "El Salvador", "GQ": "Equatorial Guinea", "ER": "Eritrea", "EE": "Estonia", "SZ": "Eswatini", "ET": "Ethiopia", "FK": "Falkland Islands ", "FO": "Faroe Islands ", "FJ": "Fiji", "FI": "Finland", "FR": "France", "GF": "French Guiana", "PF": "French Polynesia", "TF": "French Southern Territories", "GA": "Gabon", "GM": "Gambia", "GE": "Georgia", "DE": "Germany", "GH": "Ghana", "GI": "Gibraltar", "GR": "Greece", "GL": "Greenland", "GD": "Grenada", "GP": "Guadeloupe", "GU": "Guam", "GT": "Guatemala", "GG": "Guernsey", "GN": "Guinea", "GW": "Guinea-Bissau", "GY": "Guyana", "HT": "Haiti", "HM": "Heard Island and McDonald Islands", "VA": "Holy See ", "HN": "Honduras", "HK": "Hong Kong", "HU": "Hungary", "IS": "Iceland", "IN": "India", "ID": "Indonesia", "IR": "Iran ", "IQ": "Iraq", "IE": "Ireland", "IM": "Isle of Man", "IL": "Israel", "IT": "Italy", "JM": "Jamaica", "JP": "Japan", "JE": "Jersey", "JO": "Jordan", "KZ": "Kazakhstan", "KE": "Kenya", "KI": "Kiribati", "KP": "Korea ", "KR": "Korea ", "KW": "Kuwait", "KG": "Kyrgyzstan", "LA": "Lao People's Democratic Republic ", "LV": "Latvia", "LB": "Lebanon", "LS": "Lesotho", "LR": "Liberia", "LY": "Libya", "LI": "Liechtenstein", "LT": "Lithuania", "LU": "Luxembourg", "MO": "Macao", "MG": "Madagascar", "MW": "Malawi", "MY": "Malaysia", "MV": "Maldives", "ML": "Mali", "MT": "Malta", "MH": "Marshall Islands", "MQ": "Martinique", "MR": "Mauritania", "MU": "Mauritius", "YT": "Mayotte", "MX": "Mexico", "FM": "Micronesia", "MD": "Moldova", "MC": "Monaco", "MN": "Mongolia", "ME": "Montenegro", "MS": "Montserrat", "MA": "Morocco", "MZ": "Mozambique", "MM": "Myanmar", "NA": "Namibia", "NR": "Nauru", "NP": "Nepal", "NL": "Netherlands", "NC": "New Caledonia", "NZ": "New Zealand", "NI": "Nicaragua", "NE": "Niger", "NG": "Nigeria", "NU": "Niue", "NF": "Norfolk Island", "MP": "Northern Mariana Islands", "NO": "Norway", "OM": "Oman", "PK": "Pakistan", "PW": "Palau", "PS": "Palestine, State of", "PA": "Panama", "PG": "Papua New Guinea", "PY": "Paraguay", "PE": "Peru", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PT": "Portugal", "PR": "Puerto Rico", "QA": "Qatar", "MK": "Republic of North Macedonia", "RO": "Romania", "RU": "Russian Federation", "RW": "Rwanda", "RE": "Réunion", "BL": "Saint Barthélemy", "SH": "Saint Helena, Ascension and Tristan da Cunha", "KN": "Saint Kitts and Nevis", "LC": "Saint Lucia", "MF": "Saint Martin", "PM": "Saint Pierre and Miquelon", "VC": "Saint Vincent and the Grenadines", "WS": "Samoa", "SM": "San Marino", "ST": "Sao Tome and Principe", "SA": "Saudi Arabia", "SN": "Senegal", "RS": "Serbia", "SC": "Seychelles", "SL": "Sierra Leone", "SG": "Singapore", "SX": "Sint Maarten", "SK": "Slovakia", "SI": "Slovenia", "SB": "Solomon Islands", "SO": "Somalia", "ZA": "South Africa", "GS": "South Georgia and the South Sandwich Islands", "SS": "South Sudan", "ES": "Spain", "LK": "Sri Lanka", "SD": "Sudan", "SR": "Suriname", "SJ": "Svalbard and Jan Mayen", "SE": "Sweden", "CH": "Switzerland", "SY": "Syrian Arab Republic", "TW": "Taiwan", "TJ": "Tajikistan", "TZ": "Tanzania, United Republic of", "TH": "Thailand", "TL": "Timor-Leste", "TG": "Togo", "TK": "Tokelau", "TO": "Tonga", "TT": "Trinidad and Tobago", "TN": "Tunisia", "TR": "Turkey", "TM": "Turkmenistan", "TC": "Turks and Caicos Islands", "TV": "Tuvalu", "UG": "Uganda", "UA": "Ukraine", "AE": "United Arab Emirates", "GB": "United Kingdom of Great Britain and Northern Ireland", "UM": "United States Minor Outlying Islands", "US": "United States of America", "UY": "Uruguay", "UZ": "Uzbekistan", "VU": "Vanuatu", "VE": "Venezuela", "VN": "Viet Nam", "VG": "Virgin Islands-British", "VI": "Virgin Islands-U.S.", "WF": "Wallis and Futuna", "EH": "Western Sahara", "YE": "Yemen", "ZM": "Zambia", "ZW": "Zimbabwe", "AX": "Åland Islands" };
    let dayMap = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6, "Sunday": 7 };
    let curCountry = "IN";
    let curYear = document.querySelectorAll(".cur-year");
    let curTime = document.querySelector("#cur-time");
    let curHour = document.querySelector("#cur-hour");
    let curMin = document.querySelector("#cur-min");
    let curSec = document.querySelector("#cur-sec");
    let curMilSec = document.querySelector("#cur-ms");
    let curDate = document.querySelector("#cur-date");
    let curMonth = document.querySelector("#cur-month");
    let curWeek = document.querySelector("#cur-week");
    let curDay = document.querySelector("#cur-day");
    let progressDay = document.querySelector("#progress-day");
    let progressWeek = document.querySelector("#progress-week");
    let progressYear = document.querySelector("#progress-year");
    let curTimezone = "Asia/Kolkata";
    let countryTimezones = document.querySelector("#country-timezone");

    function removeOptionsChild() {
        while (countryTimezones.hasChildNodes()) {
            countryTimezones.removeChild(countryTimezones.firstChild);
        }
    }

    async function renderTimezone(country) {
        const response = await fetch("/country-timeZ", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country }) });
        const data = await response.json();
        removeOptionsChild();
        for (const tz in data) {
            let option = document.createElement("option");
            option.textContent = data[tz];
            countryTimezones.appendChild(option);
        }
        curTimezone = data[0];
        updateTime();
    }

    async function loadTime() {
        let res = await fetch("/get-tz-time", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ timezone: curTimezone }) });
        let data = await res.json();
        return data;
    }

    async function updateTime() {
        // country
        document.querySelector("#cur-country").textContent = curCountry;

        // time
        let fullTimeTimeZone = await loadTime();
        curTime.textContent = fullTimeTimeZone.time;
        curHour.textContent = fullTimeTimeZone.hour;
        curMin.textContent = fullTimeTimeZone.minute;
        curSec.textContent = fullTimeTimeZone.second;
        curMilSec.textContent = fullTimeTimeZone.millisecond;
        curDate.textContent = fullTimeTimeZone.fullDate;
        curMonth.textContent = fullTimeTimeZone.month;
        curWeek.textContent = fullTimeTimeZone.weekday;
        curDay.textContent = fullTimeTimeZone.day;

        //progress-bar-status
        progressDay.style.width = `${(fullTimeTimeZone.hour * (100 / 24)).toFixed(2)}%`;
        let weekday = dayMap[fullTimeTimeZone.weekday] - 1;
        progressWeek.style.width = `${(weekday * (100 / 7)).toFixed(2)}%`;
        progressYear.style.width = `${((fullTimeTimeZone.month - 1) * (100 / 12)).toFixed(2)}%`;

        // Year
        for (let i = 0; i < curYear.length; i++) {
            curYear[i].textContent = fullTimeTimeZone.year;
        }

        // Full-Time & Min & Second refreshes every 100ms or 1/10sec
        setInterval(async () => {
            let t = await loadTime();
            curTime.textContent = t.time;
            curSec.textContent = t.second;
            curMin.textContent = t.minute;
        }, 100);
        // Hour refreshes every 1 minute or 60sec
        setInterval(async () => {
            let t = await loadTime();
            curHour.textContent = t.hour;
        }, 60000);
        // Milli-Second refreshes every 1ms or 1/1000sec
        setInterval(async () => {
            let t = await loadTime();
            curMilSec.textContent = t.millisecond;
        }, 1);
        // Date & Weekday & day & Year & Month refreshes every 1 minute or 60sec
        setInterval(async () => {
            let t = await loadTime();
            curDate.textContent = t.fullDate;
            curWeek.textContent = t.weekday;
            curDay.textContent = t.day;
            curMonth.textContent = t.month;
            for (let i = 0; i < curYear.length; i++) {
                curYear[i].textContent = t.year;
            }
        }, 60000);
    }

    // current-country timezone
    renderTimezone(curCountry);

    curCountry=countryList[curCountry];
    await updateTime();
    

    // Country-flags
    let countriesFlag = document.querySelectorAll(".flag");
    for (let i = 0; i < countriesFlag.length; i++) {
        let curCountryFlag = document.querySelectorAll(".flag")[i];
        curCountryFlag.setAttribute("src", `https://flagsapi.com/${curCountryFlag.id}/flat/64.png`);
        curCountryFlag.addEventListener("click", (event) => {
            let country = event.target.attributes[1].nodeValue;
            curCountry = countryList[country];
            document.getElementById("time-info-view").scrollIntoView({ behavior: "smooth" });
            renderTimezone(country);
        });
    }

    // Creating Country options 
    let countryOption = document.querySelector("#country-name");
    for (const [countryCode, countryName] of Object.entries(countryList)) {
        let option = document.createElement("option");
        option.value = countryCode;
        option.textContent = countryName;
        if (countryName == "India") {
            option.selected = true;
        }
        countryOption.appendChild(option);
    }

    // Time-Since
    document.querySelector("#from-to-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const fromDate = document.querySelector("#fromDate").value;
        const toDate = document.querySelector("#toDate").value;
        const response = await fetch("/from-to-date", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fromDate: fromDate, toDate: toDate })
        });
        const data = await response.json();
        document.querySelector(".form-data-result").classList.remove("hidden");
        document.querySelector("#time-since-res").innerHTML = `<div>${data.years} year(s),</div><div>${data.months} month(s),</div><div>${data.days} day(s)</div>`;
        document.querySelector("#time-since-submit-btn").value = "Re-Calculate";
    });

    // Updating time based on the Country selected from country form
    document.querySelector("#country-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        let country = document.querySelector("#country-name").value;
        curCountry = countryList[country];
        document.getElementById("time-info-view").scrollIntoView({ behavior: "smooth" });
        await renderTimezone(country);
    });

    // Adjusting time based on the selected timezone
    document.querySelector("#countries-timezone").addEventListener("submit", async (event) => {
        event.preventDefault();
        let selectedTZ = countryTimezones.options[countryTimezones.selectedIndex].text;
        curTimezone = selectedTZ;
        await updateTime();
    });

});