// Add these new variable declarations at the top of script.js
const surveyContainer = document.getElementById("surveyContainer");
const thankYouMessage = document.getElementById("thankYouMessage");

document.addEventListener("DOMContentLoaded", function() {
    const questions = [
      // General & Household Demographics
      {
        id: 0,
        text: "What is your name?",
        input: "text",
        placeholder: "Your full name",
        name: "name"
      },
      {
        id: 0.1,
        text: "What is your city and pincode?",
        input: "multiple",
        inputs: [
          { name: "City", placeholder: "City / Village", type: "text" },
          { name: "Pincode", placeholder: "Pincode", type: "text", pattern: "^\\d{6}$", validationMessage: "Please enter a valid 6-digit numeric Pincode." }
        ]
      },
      {
        id: 162,
        text: "How many members of your household are adults (18 years of age or older)?",
        input: "number",
        placeholder: "Number of adults",
        min: "0",
        step: "1",
        name: "num_adults"
      },

      // Home Characteristics
      {
        id: 1,
        text: "Which best describes your home?",
        options: [
          "Mobile home",
          "Single-family house detached from any other house",
          "Single-family house attached to one or more other houses (for example: duplex, row house, or townhome)",
          "Apartment in a building with 2 to 4 units",
          "Apartment in a building with 5 or more units"
        ],
        name: "home_type"
      },
      {
        id: 2,
        text: "Do you own or rent your home?",
        options: ["Own", "Rent"],
        name: "ownership"
      },
      {
        id: 3,
        text: "When was your home built?",
        options: ["Before 1970", "1970 to 1979", "1980 to 1989", "1990 to 1999", "2000 to 2009", "2010 to 2019", "2020 to present"],
        condition: { questionId: 2, value: "Own" },
        name: "year_built"
      },
      {
        id: 4,
        text: "When did your household move in?",
        options: ["Before 1970", "1970 to 1979", "1980 to 1989", "1990 to 1999", "2000 to 2009", "2010 to 2019", "2020 to present"],
        condition: { questionId: 2, value: "Rent" },
        name: "move_in_year"
      },{
        id: 5,
        text: "What is the approximate square footage of your home? If you do not know, please enter your best estimate. If you live in an apartment, please include the square footage of your unit only, not the entire building.",
        input: "number",
        placeholder: "Square footage",
        min: "0",
        step: "1",
        name: "sq_ft_home"
      },
      {
        id: 16,
        text: "Which of the following areas are included in your estimate of square footage?",
        type: "checkbox",
        sections: [
          {
            title: "A. Basement",
            name: "sq_ft_basement",
            options: ["Yes", "No", "Don't know", "Not applicable (my home does not have this space)"]
          },
          {
            title: "B. Attic",
            name: "sq_ft_attic",
            options: ["Yes", "No", "Don't know", "Not applicable (my home does not have this space)"]
          },
          {
            title: "C. Attached garage",
            name: "sq_ft_garage",
            options: ["Yes", "No", "Don't know", "Not applicable (my home does not have this space)"]
          }
        ]
      },

      // Kitchen Appliances
      {
        id: 36,
        text: "How many refrigerators(fridge) are plugged-in and turned on in your home? Include refrigerators in basements or garages, even if they are only used occasionall. If none, please enter \"0.\"",
        input: "number",
        placeholder: "Number of refrigerators",
        min: "0",
        step: "1",
        name: "num_refrigerators"
      },
      {
        id: 37,
        text: "What is the size of your most used refrigerator?",
        options: [
          "Half-size or compact",
          "Small (17.5 cubic feet or less)",
          "Medium (17.6 to 22.5 cubic feet)",
          "Large (22.6 to 29.5 cubic feet)",
          "Very large (bigger than 29.5 cubic feet)"
        ],
        condition: { questionId: 36, operator: "greater", value: 0 },
        name: "refrigerator_size"
      },
      {
        id: 38,
        text: "Which of the following best describes your most used refrigerator?",
        options: [
          "One door",
          "Two doors, freezer next to the refrigerator",
          "Two doors, freezer above the refrigerator",
          "Two doors, freezer below the refrigerator",
          "Three or more doors"
        ],
        condition: { questionId: 36, operator: "greater", value: 0 },
        name: "refrigerator_type"
      },
      {
        id: 39,
        text: "About how old is your most used refrigerator? Your best estimate is fine.",
        options: [
          "Less than 2 years old",
          "2 to 4 years old",
          "5 to 9 years old",
          "10 to 14 years old",
          "15 to 19 years old",
          "20 or more years old",
          "Don't know"
        ],
        condition: { questionId: 36, operator: "greater", value: 0 },
        name: "refrigerator_age"
      },
      {
        id: 49,
        text: "How many stoves/ranges do you have in your home? A stove has both a cooktop and an oven.If none, please enter \"0.\"",
        input: "number",
        placeholder: "Number of stoves/ranges",
        min: "0",
        step: "1",
        name: "num_stoves"
      },
      {
        id: 50,
        text: "What fuel does your most used stove/range use?",
        options: [
          "Electricity",
          "Natural gas from underground pipes",
          "Propane (bottled gas)",
          "Liquid petroleum gas (LPG)",
          "Other (please specify)"
        ],
        hasOther: true,
        condition: { questionId: 49, operator: "greater", value: 0 },
        name: "stove_fuel"
      },
      {
        id: 56,
        text: "How many separate wall ovens do you have in your home? Do not include wall ovens that are attached to a cooktop.If none, please enter \"0.\"",
        input: "number",
        placeholder: "Number of separate wall ovens",
        min: "0",
        step: "1",
        name: "num_wall_ovens"
      },
      {
        id: 57,
        text: "What fuel does your most used separate wall oven use?",
        options: [
          "Electricity",
          "Natural gas from underground pipes",
          "Propane (bottled gas)",
          "Other (please specify)"
        ],
        hasOther: true,
        condition: { questionId: 56, operator: "greater", value: 0 },
        name: "wall_oven_fuel"
      },
      {
        id: 58,
        text: "In a typical week, about how many times is your most used separate wall oven used? If not used, please enter \"0.\"",
        input: "number",
        placeholder: "Times per week",
        min: "0",
        step: "1",
        condition: { questionId: 56, operator: "greater", value: 0 },
        name: "wall_oven_usage"
      },
      {
        id: 63,
        text: "Are any of the following small kitchen appliances used at least once a week in your home?",
        type: "yes_no_grid",
        appliances: [
          "Toaster",
          "Toaster oven",
          "Coffee maker",
          "Crock pot or slow cooker",
          "Food processor",
          "Rice cooker",
          "Blender or juicer",
          "Other (please specify)"
        ]
      },

      // Laundry Appliances
      {
        id: 68,
        text: " Does your household have a clothes washer? Do not include community clothes washers that are located in the basement or laundry room of your apartment building.",
        options: ["Yes", "No"],
        name: "has_clothes_washer"
      },
      {
        id: 70,
        text : " In a typical week, about how many times is your clothes washer used? If not used, please enter \"0.\"",
        input: "number",
        placeholder: "Times per week",
        min: "0",
        step: "1",
        condition: { questionId: 68, value: "Yes" },
        name: "clothes_washer_usage"
      },
      {
        id: 73,
        text: "About how old is your clothes washer? Your best estimate is fine. ",
        options: [
          "Less than 2 years old",
          "2 to 4 years old",
          "5 to 9 years old",
          "10 to 14 years old",
          "15 to 19 years old",
          "20 or more years old",
          "Don't know"
        ],
        condition: { questionId: 68, value: "Yes" },
        name: "clothes_washer_age"
      },

      // Electronics & Internet Usage
      {
        id : 78,
        text: " How many televisions are used in your home? If none, please enter \"0.\" ",
        input: "number",
        placeholder: "Number of televisions",
        min: "0",
        step: "1",
        name: "num_televisions"
      },
      {
        id: 79,
        text: "What is the size of your most used television?",
        options: [
          "Less than 27 inches",
          "27 to 39 inches",
          "40 to 59 inches",
          "60 inches or larger"
        ],
        condition: { questionId: 78, operator: "greater", value: 0 },
        name: "tv_size"
      },
      {
        id: 80,
        text: "What type of television do you have?",
        options: [
          "CRT (cathode ray tube)",
          "LCD (liquid crystal display)",
          "LED (light-emitting diode)",
          "Plasma",
          "OLED (organic light-emitting diode)",
          "Other (please specify)"
        ],hasOther: true,
        condition: { questionId: 78, operator: "greater", value: 0 },
        name: "tv_type"
      },
      {
        id : 81,
        text : " Thinking about your most used television's use on weekdays, how many hours is it turned on each day? Include the time it is on even if no one is actually watching it. ",
        input : "number",
        placeholder : "Hours per day",
        min: "0",
        step: "1",
        condition: { questionId: 78, operator: "greater", value: 0 },
        name: "tv_daily_hours"
      },
      {
        id: 88,
        text: "How many of each of the following are used in your home? If none, please enter \"0.\"",
        type: "multiple_number",
        devices: [
          { label: "Number of desktop computers", name: "num_desktop_computers" },
          { label: "Number of laptop computers", name: "num_laptop_computers" },
          { label: "Number of tablet computers or e-readers (for example: iPad or Kindle)", name: "num_tablets_ereaders" },
          { label: "Number of printers, scanners, fax machines, or copiers", name: "num_printers_scanners_etc" },
          { label: "Number of \"smart\" phones (for example, iPhone or Android)", name: "num_smart_phones" },
          { label: "Number of other cellular phones", name: "num_other_cell_phones" }
        ]
      },
      {
        id: 89,
        text: "In your home, do you or any members of your household access the Internet? ",
        options: ["Yes", "No"],
        name: "access_internet"
      },
      {
        id: 90,
        text: " Is a wireless router used in your home for accessing the Internet?",
        options: ["Yes", "No", "Don't know"],
        condition: { questionId: 89, value: "Yes" },
        name: "has_wireless_router"
      },

      // Space Heating
      {
        id : 91,
        text: "Is your home heated during the winter?",
        options: ["Yes", "No, I do not have any heating equipment.", " No, I have heating equipment but do not use it."],
        name: "is_home_heated"
      },
      {
        id : 92,
        text: " What is the main type of heating equipment used to provide heat for your home?",
        options: [
          "Central furnace",
          "Heat pump",
          "Steam or hot water system with radiators or pipes",
          "Built-in electric units installed in walls, ceilings, baseboards, or floors",
          "Built-in floor/wall pipeless furnace",
          "Built-in room heater burning gas, oil, or kerosene",
          "Heating stove burning wood, coal, or coke",
          "Portable electric heaters",
          "Other (please specify)"
        ],
        hasOther: true,
        condition: { questionId: 91, value: "Yes" },
        name: "main_heating_equipment"
      },
      {
        id: 93,
        text: "About how old is your main heating equipment? Your best estimate is fine. ",
        options: [
          "Less than 2 years old",
          "2 to 4 years old",
          "5 to 9 years old",
          "10 to 14 years old",
          "15 to 19 years old",
          "20 or more years old",
          "Don't know"
        ],
        condition: { questionId: 91, value: "Yes" },
        name: "main_heating_equipment_age"
      },
      {
        id : 94,
        text:"What is the main fuel used by this equipment for heating your home?",
        options: [
          "Electricity",
          "Natural gas from underground pipes",
          "Propane (bottled gas)",
          "Fuel oil or kerosene",
          "Wood",
          "Other (please specify)"
        ],
        hasOther: true,
        condition: { questionId: 91, value: "Yes" },
        name: "main_heating_fuel"
      },

      // Air Conditioning & Cooling
      {
        id: 103,
        text: "Is any air conditioning equipment used in your home? ",
        options: ["Yes", "No"],
        name: "has_ac"
      },
      {
        id: 104,
        text: " Do you use a central air conditioning system?",
        options: ["Yes", "No"],
        condition: { questionId: 103, value: "Yes" },
        name: "uses_central_ac"
      },
      {
        id : 105,
        text:" Is your central air conditioning system a heat pump? ",
        options: ["Yes", "No", "Don't know"],
        condition: { questionId: 104, value: "Yes" },
        name: "central_ac_is_heat_pump"
      },
      {
        id : 106,
        text : "About how old is your central air conditioning system? Your best estimate is fine. ",
        options: [
          "Less than 2 years old",
          "2 to 4 years old",
          "5 to 9 years old",
          "10 to 14 years old",
          "15 to 19 years old",
          "20 or more years old",
          "Don't know"
        ],
        condition: { questionId: 104, value: "Yes" },
        name: "central_ac_age"
      },
      {
        id: 114,
        text: "The next questions are about the temperature inside your home during the summer. If you have a thermostat, think about where your household sets the temperature for your air conditioning equipment. If you do not have a thermostat, your best guess about the temperature is fine. ",
        type: "input_group",
        section: [
          {
            title: " During the summer, what is the typical temperature when someone is home during the day? ",
            inputType: "number",
            placeholder: "degrees",
            min: -273.15,
            step: "0.01",
            name: "temp_summer_day_home"
          },
          {
            title: " What is the typical temperature when no one is inside your home during the day? ",
            inputType: "number",
            placeholder: "degrees",
            min: -273.15,
            step: "0.01",
            name: "temp_summer_day_away"
          },
          {
            title: " What is the typical temperature inside your home at night? ",
            inputType: "number",
            placeholder: "degrees",
            min: -273.15,
            step: "0.01",
            name: "temp_summer_night"
          }
        ],
        condition: { questionId: 103, value: "Yes" }
      },
      {
        id: 117,
        text: "How many of the following types of fans does your household use? If none, please enter “0.”",
        type: "multiple_number",
        devices: [
          { label: "Number of ceiling fans", name: "num_ceiling_fans" },
          { label: "Number of floor or window fans", name: "num_floor_window_fans" },
          { label: "Number of whole house fans", name: "num_whole_house_fans" },
          { label: "Number of attic fans", name: "num_attic_fans" }
        ]
      },

      // Water Heating
      {
        id: 118,
        text: "Does your home have a water heater?",
        options: ["Yes", "No"],
        name: "has_water_heater"
      },
      {
        id: 121,
        text: " What is the approximate size of your main water heater? ",
        options: [
            "Small (less than 15 litres)",
            "Medium (15 to 25 litres)",
            "Large (more than 25 litres)",
            "Tankless (instant/on-demand)",
            "Don't know"
        ],
        condition: { questionId: 118, value: "Yes" },
        name: "water_heater_size"
      },
      {
        id:122,
        text: "About how old is your main water heater? Your best estimate is fine. ",
        options: [
          "Less than 2 years old",
          "2 to 4 years old",
          "5 to 9 years old",
          "10 to 14 years old",
          "15 to 19 years old",
          "20 or more years old",
          "Don't know"
        ],
        condition: { questionId: 118, value: "Yes" },
        name: "water_heater_age"
      },
      {
        id: 123,
        text: "What fuel does your main water heater use?",
        options: [
          "Electricity",
          "Natural gas from underground pipes",
          "Propane (bottled gas)",
          "Fuel oil or kerosene",
          "Solar",
          "Don't know",
          "Other (please specify)"
        ],hasOther: true,
        condition: { questionId: 118, value: "Yes" },
        name: "water_heater_fuel"
      },

      // Lighting
      {
        id : 126,
        text: " Approximately how many light bulbs are installed inside your home? Include light bulbs in ceiling fixtures and fans, table and floor lamps, as well as those used infrequently, such as in hallways, closets, and garages. For fixtures with multiple bulbs, count each bulb separately. ",
        options: [
          "Less than 10",
          "10 to 19",
          "20 to 29",
          "30 to 39",
          "40 to 49",
          "50 or more",
          "Don't know"
        ],
        name: "num_light_bulbs_total"
      },
      {
        id: 127,
        text: " How many of the light bulbs inside your home are used at least 4 hours per day? ",
        input: "number",
        placeholder: "Light bulbs",
        min: "0",
        step: "1",
        name: "num_light_bulbs_4hr_plus"
      },
      {
        id: 133,
        text: " Are any of the following types of light bulbs used outside your home? ",
        type: "yes_no_grid",
        appliances: [
          "Incandescent",
          "Natural gas lights",
          "CFL (compact fluorescent lamp)",
          "LED (light-emitting diode)"
        ]
      },

      // Energy Payment & Generation
      {
        id : 142,
        text:"Which of the following describes who is responsible for paying for the electricity used in this home?",
        options: [
          "Household is responsible for paying for all electricity used in this home",
          "All electricity used in this home is included in the rent or condo fee",
          "Some is paid by the household, some is included in the rent or condo fee",
          "Don't know",
          "Other (please specify)"
        ], hasOther: true,
        name: "electricity_payment_responsibility"
      },
      {
        id : 143,
        text: "Which of the following describes who is responsible for paying for the natural gas used in this home?",
        options: [
          "Household is responsible for paying for all natural gas used in this home",
          "All natural gas used in this home is included in the rent or condo fee",
          "Some is paid by the household, some is included in the rent or condo fee",
          "Don't know",
          "Other (please specify)"
        ], hasOther: true,
        name: "natural_gas_payment_responsibility"
      },
      {
        id:145,
        text: "Which of the following describes who is responsible for paying for the fuel oil used in this home?",
        options: [
          "Household is responsible for paying for all fuel oil used in this home",
          "All fuel oil used in this home is included in the rent or condo fee",
          "Some is paid by the household, some is included in the rent or condo fee",
          "Don't know",
          "Other (please specify)"
        ], hasOther: true,
        name: "fuel_oil_payment_responsibility"
      },
      {
        id: 151,
        text: "Does your household have a back-up generator that can be used for generating electricity in case of a power outage or emergency?",
        options: ["Yes", "No"],
        name: "has_backup_generator"
      },
      {
        id: 152,
        text: "Not including back-up generators, does your home have any of these on-site systems that generate electricity? Please select all that apply.",
        options: [
          "No on-site generation system",
          "Solar or photovoltaic system",
          "Small wind turbine",
          "Combined heat and power system",
          "Other (please specify)"
        ], hasOther: true,
        name: "on_site_electricity_generation"
      },
      {
        id: 164,
        text: "What is your average annual household spending on electricity?",
        options: [
          "Less than ₹50,000",
          "₹50,000 to ₹1,00,000",
          "₹1,00,001 to ₹1,50,000",
          "₹1,50,001 to ₹2,00,000",
          "More than ₹2,00,000",
          "Prefer not to answer"
        ],
        name: "avg_annual_electricity_spending"
      },
      {
        id : 181,
        text: "Does your household receive fuel oil or kerosene deliveries?",
        options: ["Yes", "No"],
        name: "receives_fuel_oil_deliveries"
      },
      {
        id : 182,
        text: "Please provide as much of the following information as you can about your fuel oil or kerosene deliveries:",
        type: "input_group",
        section: [
          {
            title: "tank size",
            inputType: "number",
            placeholder: "liters",
            min: "0",
            step: "any",
            name: "fuel_oil_tank_size"
          },
          {
            title: "Number of fuel oil or kerosene deliveries in the past year:",
            inputType: "number",
            placeholder: "Number of deliveries",
            min: "0",
            step: "1",
            name: "fuel_oil_num_deliveries_past_year"
          },
          {
            title: "Total liters of fuel oil or kerosene used in the past year:",
            inputType: "number",
            placeholder: "Total liters",
            min: "0",
            step: "any",
            name: "fuel_oil_total_gallons_past_year"
          },
          {
            title: "Total cost of fuel oil or kerosene used in the past year:",
            inputType: "number",
            placeholder: "Total cost in rupees",
            min: "0",
            step: "any",
            name: "fuel_oil_total_cost_past_year"
          }
        ],
        condition: { questionId: 181, value: "Yes" }
      },
      {
        id:183,
        text: "does your household use wood for fuel?",
        options: ["Yes", "No"],
        name: "uses_wood_for_fuel"
      },
      {
        id: 184,
        text: "Please provide as much of the following information as you can about your wood use:",
        type: "input_group",
        section: [
          {
            title: "Total amount of wood pellets used in the past year:",
            inputType: "number",
            placeholder: "tons",
            min: "0",
            step: "any",
            name: "wood_pellets_total_amount_past_year"
          },
          {
            title: "Total cost of wood used in the past year:",
            inputType: "number",
            placeholder: "Cost in rupees",
            min: "0",
            step: "any",
            name: "wood_total_cost_past_year"
          }
        ],
        condition: { questionId: 183, value: "Yes" }
      },{
        questionId: 185,
        text: "what is the last electricity bill amount you paid?",
        input: "number",
        placeholder: "Electricity bill amount in rupees",
        min: "0",
        step: "any",
        name: "last_electricity_bill_amount"
      },{
        questionId: 186,
        text: "How much electricity did you consume the last time you paid the bill?",
        input: "number",
        placeholder: "Electricity consumption in kWh",
        min: "0",
        step: "any",
        name: "last_electricity_consumption"
      }
    ];

    const questionsDiv = document.getElementById("questions");
    const surveyForm = document.getElementById("surveyForm");
    const resetBtn = document.getElementById("resetBtn");
    const statusDiv = document.getElementById("status");

    // Function to render all questions
   function renderAllQuestions() {
  questionsDiv.innerHTML = ""; // Clear existing content

  questions.forEach(q => {
    const block = document.createElement("div");
    block.className = "question-block";
    block.setAttribute("data-question-id", q.id); // For conditional visibility

    const questionText = document.createElement("div");
    questionText.className = "question-text";
    questionText.textContent = q.text;
    block.appendChild(questionText);

    let inputHtml = '';

    if (q.input === "number" || q.input === "text") {
      inputHtml = `<input type="${q.input}" name="Q${q.id}_${q.name}" placeholder="${q.placeholder || ''}" ${q.min !== undefined ? `min="${q.min}"` : ''} ${q.step !== undefined ? `step="${q.step}"` : ''} required>`;
      block.innerHTML += inputHtml;
    } else if (q.input === "multiple") {
      // MODIFIED BLOCK FOR CITY AND PINCODE ALIGNMENT
      let multipleInputHtml = ''; // Use a separate variable for this specific block
      q.inputs.forEach(inputDef => {
        const inputName = `Q${q.id}_${inputDef.name}`; // Generate unique name and ID
        multipleInputHtml += `
          <div class="input-group-item">
            <label for="${inputName}">${inputDef.placeholder}:</label>
            <input type="${inputDef.type}" id="${inputName}" name="${inputName}" placeholder="${inputDef.placeholder}" ${inputDef.pattern ? `pattern="${inputDef.pattern}"` : ''} required />
          </div>
        `;
      });
      block.innerHTML += multipleInputHtml; // Append the collected HTML
    } else if (q.type === "checkbox") {
      q.sections.forEach(section => {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "section";
        sectionDiv.innerHTML = `<h4>${section.title}</h4>`;
        section.options.forEach(opt => {
          sectionDiv.innerHTML += `
            <label>
              <input type="radio" name="Q${q.id}_${section.name}" value="${opt}" />
              ${opt}
            </label>
          `;
        });
        block.appendChild(sectionDiv);
      });
    } else if (q.type === "yes_no_grid") {
      const gridDiv = document.createElement("div");
      gridDiv.className = "yes-no-grid";

      const headerDiv = document.createElement("div");
      headerDiv.className = "grid-header";
      headerDiv.innerHTML = `
        <div class="appliance-label">Appliance</div>
        <div class="yes-no-options">
          <span>Yes</span>
          <span>No</span>
        </div>
      `;
      gridDiv.appendChild(headerDiv);

      q.appliances.forEach((appliance, index) => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "grid-row";

        const applianceName = appliance.replace(/[^a-zA-Z0-9]/g, '_');
        rowDiv.innerHTML = `
          <div class="appliance-name">${String.fromCharCode(65 + index)}. ${appliance}</div>
          <div class="yes-no-buttons">
            <label><input type="radio" name="Q${q.id}_${applianceName}" value="Yes" /><span class="radio-custom"></span></label>
            <label><input type="radio" name="Q${q.id}_${applianceName}" value="No" /><span class="radio-custom"></span></label>
          </div>
        `;
        gridDiv.appendChild(rowDiv);

        if (appliance.includes("Other (please specify)")) {
          const otherDiv = document.createElement("div");
          otherDiv.className = "other-input-grid";
          // Make 'other' input conditional to the 'Yes' or 'No' selection
          otherDiv.innerHTML = `<input type="text" name="Q${q.id}_${applianceName}_other" placeholder="Please specify..." style="width: calc(100% - 40px);" disabled />`;
          gridDiv.appendChild(otherDiv);
        }
      });
      block.appendChild(gridDiv);
    } else if (q.type === "multiple_number") {
      const inputsDiv = document.createElement("div");
      inputsDiv.className = "multiple-number-inputs";
      q.devices.forEach((device, index) => {
        inputsDiv.innerHTML += `
          <div class="number-input-row">
            <div class="device-label">${device.label}</div>
            <input type="number" name="Q${q.id}_${device.name}" min="0" step="1" required />
          </div>
        `;
      });
      block.appendChild(inputsDiv);
    } else if (q.type === "input_group") {
      q.section.forEach(inputSection => {
        const inputDiv = document.createElement("div");
        inputDiv.className = "input-section";
        inputDiv.innerHTML = `<h4>${inputSection.title}</h4>`;
        inputDiv.innerHTML += `
          <input type="${inputSection.inputType}" name="Q${q.id}_${inputSection.name}"
            placeholder="${inputSection.placeholder || ''}"
            ${inputSection.min !== undefined ? `min="${inputSection.min}"` : ''}
            ${inputSection.step !== undefined ? `step="${inputSection.step}"` : ''}
            ${inputSection.pattern ? `pattern="${inputSection.pattern}"` : ''}
            required />
        `;
        block.appendChild(inputDiv);
      });
    } else {
      // Regular radio button questions
      q.options.forEach(opt => {
        block.innerHTML += `
          <label>
            <input type="radio" name="Q${q.id}_${q.name}" value="${opt}" />
            ${opt}
          </label>
        `;
      });
      if (q.hasOther) {
        // Make 'other' input conditional to the 'Other (please specify)' selection
        block.innerHTML += `<div class="other-input"><input type="text" name="Q${q.id}_other" placeholder="Please specify..." style="width: calc(100% - 40px);" disabled /></div>`;
      }
    }

    questionsDiv.appendChild(block);
  });
  updateQuestionVisibility(); // Set initial visibility based on conditions
}
    // Function to collect all form data
    function collectFormData() {
      const formData = {};
      const formElements = surveyForm.elements;

      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.name && !element.disabled) { // Only collect data from enabled elements
          if (element.type === "radio") {
            if (element.checked) {
              formData[element.name] = element.value;
            }
          } else if (element.type === "checkbox") {
             // For checkboxes, you might want to collect all checked values as an array
             // This example assumes unique names for each checkbox choice if multiple selections are truly allowed
             // For now, it treats them like radio buttons within a section (only one selection)
             if (element.checked) {
                formData[element.name] = element.value;
             }
          } else if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT") {
            formData[element.name] = element.value;
          }
        }
      }
      return formData;
    }

    // Function to update visibility of conditional questions and 'other' inputs
    function updateQuestionVisibility() {
      const currentAnswers = collectFormData(); // Get current state of answers

      questions.forEach(q => {
        const questionBlock = document.querySelector(`[data-question-id="${q.id}"]`);
        if (!questionBlock) return; // Should not happen if all questions are rendered

        // Handle conditional question visibility
        if (q.condition) {
          const conditionQuestionId = q.condition.questionId;
          const conditionValue = q.condition.value;
          const conditionOperator = q.condition.operator;

          let conditionInputName;
          const conditionQuestionDef = questions.find(item => item.id === conditionQuestionId);

          if (conditionQuestionDef) {
            // Adjust for single inputs vs. multiple inputs in the condition
            if (conditionQuestionDef.input === "number" || conditionQuestionDef.input === "text") {
              conditionInputName = `Q${conditionQuestionDef.id}_${conditionQuestionDef.name}`;
            } else if (conditionQuestionDef.input === "multiple") {
                // If a condition relied on a specific sub-input of a 'multiple' type,
                // you'd need to specify which one here. For now, assuming direct name if applicable.
                conditionInputName = `Q${conditionQuestionDef.id}_${conditionQuestionDef.inputs[0].name}`; // Default to first input for multi
            } else {
              conditionInputName = `Q${conditionQuestionDef.id}_${conditionQuestionDef.name}`;
            }
          }

          const answerForCondition = currentAnswers[conditionInputName];
          let shouldBeVisible = false;

          if (conditionOperator === "greater") {
            shouldBeVisible = parseInt(answerForCondition) > conditionValue;
          } else {
            shouldBeVisible = answerForCondition === conditionValue;
          }

          if (shouldBeVisible) {
            questionBlock.style.display = 'block';
            questionBlock.querySelectorAll('input, select, textarea').forEach(input => {
              input.removeAttribute('disabled');
            });
          } else {
            questionBlock.style.display = 'none';
            questionBlock.querySelectorAll('input, select, textarea').forEach(input => {
              input.setAttribute('disabled', 'true');
              if (input.type === 'radio' || input.type === 'checkbox') {
                input.checked = false;
              } else {
                input.value = '';
              }
            });
          }
        } else {
          // Always show questions without conditions
          questionBlock.style.display = 'block';
          questionBlock.querySelectorAll('input, select, textarea').forEach(input => {
              input.removeAttribute('disabled');
          });
        }

        // Handle "Other (please specify)" input visibility
        if (q.hasOther) {
            const otherInput = questionBlock.querySelector(`input[name="Q${q.id}_other"]`);
            if (otherInput) {
                const selectedOption = questionBlock.querySelector(`input[name="Q${q.id}_${q.name}"]:checked`);
                if (selectedOption && selectedOption.value.includes("Other (please specify)")) {
                    otherInput.removeAttribute('disabled');
                    otherInput.setAttribute('required', 'true'); // Make required when visible
                } else {
                    otherInput.setAttribute('disabled', 'true');
                    otherInput.removeAttribute('required');
                    otherInput.value = ''; // Clear value when hidden
                }
            }
        }
        // Handle "Other (please specify)" for yes_no_grid
        if (q.type === "yes_no_grid") {
            q.appliances.forEach(appliance => {
                if (appliance.includes("Other (please specify)")) {
                    const applianceName = appliance.replace(/[^a-zA-Z0-9]/g, '_');
                    const otherRadio = questionBlock.querySelector(`input[name="Q${q.id}_${applianceName}"][value="Yes"]`); // Assuming "Other" implies "Yes"
                    const otherInput = questionBlock.querySelector(`input[name="Q${q.id}_${applianceName}_other"]`);

                    if (otherRadio && otherInput) {
                        if (otherRadio.checked) {
                            otherInput.removeAttribute('disabled');
                            otherInput.setAttribute('required', 'true');
                        } else {
                            otherInput.setAttribute('disabled', 'true');
                            otherInput.removeAttribute('required');
                            otherInput.value = '';
                        }
                    }
                }
            });
        }

      });
    }

    // Add event listeners to all relevant inputs for real-time visibility updates
    questionsDiv.addEventListener('change', (event) => {
      // Check if the changed element's name matches a question ID used in a condition
      // This is a simplified check; a more robust solution might map input names to question IDs
      const changedQuestionIdMatch = event.target.name.match(/^Q(\d+(\.\d+)?)/);
      if (changedQuestionIdMatch) {
        updateQuestionVisibility();
      }
    });


    // Event listener for Reset button
    resetBtn.addEventListener("click", () => {
      surveyForm.reset(); // Resets all form fields
      updateQuestionVisibility(); // Reset visibility for conditional questions
      statusDiv.textContent = ""; // Clear status message
      statusDiv.style.color = ""; // Reset status color
    });

    // Event listener for form submission
    surveyForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default form submission

      statusDiv.textContent = ""; // Clear previous status messages
      statusDiv.style.color = ""; // Reset color

      // Client-side validation for all currently visible fields
      const allInputs = surveyForm.querySelectorAll('input:not([disabled]), select:not([disabled]), textarea:not([disabled])');
      let formIsValid = true;
      let firstInvalidElement = null;

      allInputs.forEach(input => {
        // Clear previous error messages for this input
        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
          existingError.remove();
        }

        // Specific validation for number types
        if (input.type === 'number') {
            const numVal = parseFloat(input.value);
            if (isNaN(numVal) && input.hasAttribute('required') && input.value.trim() === "") {
                formIsValid = false;
                if (!firstInvalidElement) firstInvalidElement = input;
                displayError(input, 'Please enter a number.');
            } else if (input.min && numVal < parseFloat(input.min)) {
                formIsValid = false;
                if (!firstInvalidElement) firstInvalidElement = input;
                displayError(input, `Value must be at least ${input.min}.`);
            } else if (input.step && input.step !== "any") { // Improved step validation
                const step = parseFloat(input.step);
                // To avoid floating point issues, scale to integers for modulo check
                const precision = (step.toString().split('.')[1] || '').length;
                if (Math.abs((numVal * (10**precision)) % (step * (10**precision))) > 1e-9) { // Using a small epsilon
                    formIsValid = false;
                    if (!firstInvalidElement) firstInvalidElement = input;
                    displayError(input, `Value must be a multiple of ${input.step}.`);
                }
            }
        }
        // Specific validation for text inputs with patterns (e.g., pincode)
        else if (input.type === 'text' && input.pattern) {
          const regex = new RegExp(input.pattern);
          if (input.value.trim() === "" && input.hasAttribute('required')) {
            formIsValid = false;
            if (!firstInvalidElement) firstInvalidElement = input;
            displayError(input, 'This field is required.');
          } else if (!regex.test(input.value)) {
            formIsValid = false;
            if (!firstInvalidElement) firstInvalidElement = input;
            // Find the original question definition to get specific validation message
            const questionIdMatch = input.name.match(/^Q(\d+(\.\d+)?)/);
            if (questionIdMatch) {
                const questionDef = questions.find(q => q.id.toString() === questionIdMatch[1]); // FIX: Use toString() for robust comparison
                if (questionDef && questionDef.input === 'multiple') {
                    const inputDef = questionDef.inputs.find(i => `Q${questionDef.id}_${i.name}` === input.name);
                    displayError(input, inputDef.validationMessage || 'Invalid format.');
                } else {
                    displayError(input, 'Invalid format.');
                }
            } else {
                displayError(input, 'Invalid format.');
            }
          }
        }
        // General required validation for other types (radio, select, etc.)
        else if (input.hasAttribute('required') && input.value.trim() === "") {
            // For radio buttons, check if at least one in the group is checked
            if (input.type === 'radio') {
                const radioGroup = document.querySelectorAll(`input[name="${input.name}"]:checked`);
                if (radioGroup.length === 0) {
                    formIsValid = false;
                    if (!firstInvalidElement) firstInvalidElement = input;
                    // Only display error once per radio group
                    if (!input.closest('.question-block').querySelector('.error-message')) {
                      // FIX: Place error after the question block itself for radio groups
                      displayError(input.closest('.question-block'), 'Please select an option.', true);
                    }
                }
            } else {
              formIsValid = false;
              if (!firstInvalidElement) firstInvalidElement = input;
              displayError(input, 'This field is required.');
            }
        }
      });

      if (!formIsValid) {
        statusDiv.textContent = "Please correct the errors in the form.";
        statusDiv.style.color = "red";
        if (firstInvalidElement) {
            firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return; // Stop submission if validation fails
      }

      // If validation passes, proceed with submission
      statusDiv.textContent = "Submitting survey...";
      statusDiv.style.color = "blue";

      // history.replaceState(null, '', '/'); // Consider if this is always desired

      const formData = collectFormData();
      console.log("Collected FormData:", formData);

      try {
        const response = await fetch("/api/submit-survey", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

       if (response.ok) {
          // On successful submission, hide the form and show the thank you message
          surveyContainer.style.display = 'none'; // Hide the survey form
          thankYouMessage.style.display = 'block'; // Show the thank you message
          window.scrollTo(0, 0); // Scroll to top to ensure message is visible
        } else {
          const result = await response.json();
          statusDiv.textContent = `Error: ${result.error || "Unknown error"}`;
          statusDiv.style.color = "red";
        }
      } catch (error) {
        console.error("Network error or submission error:", error);
        statusDiv.textContent = "Network error or submission failed. Please try again.";
        statusDiv.style.color = "red";
      }
    });

    // FIX: Modified displayError to allow inserting before or after, and better placement for radio errors
    function displayError(element, message, afterElement = false) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;

      if (afterElement) {
        // Insert after the target element's last child if it's a block, or after the element itself
        element.appendChild(errorDiv);
      } else {
        // Default: Insert after the element
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
      }
    }

    renderAllQuestions();
});