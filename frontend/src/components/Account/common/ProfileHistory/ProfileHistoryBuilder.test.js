import { buildHistory } from "./ProfileHistoryBuilder";

const FORM_TIMESTAMP_IN_SECS = 1587469954;
const FORM_TIMESTAMP = FORM_TIMESTAMP_IN_SECS * 1000;
const answerBuilder = () => {
  return {
    RootElement: {
      UserId: 25,
      formId: 1,
      answers: [
        {
          id: 1,
          answer: "true",
          questionText: "Ai avut febră 38 grade celsius sau mai mare?"
        },
        {
          id: 2,
          answer: "2020-04-15",
          questionText: "Din ce dată ai avut prima dată febră?"
        },
        {
          id: 3,
          answer: "true",
          questionText: "Ai avut durere în gât și/sau dificultate în a înghiți?"
        },
        {
          id: 4,
          answer: "2020-04-09",
          questionText:
            "Din ce dată ai avut durere în gât și/sau dificultate în a înghiți?"
        },
        {
          id: 5,
          answer: "true",
          questionText: "Ai avut tuse intensă?"
        },
        {
          id: 6,
          answer: "2020-04-10",
          questionText: "Din ce data ai avut tuse?"
        },
        {
          id: 7,
          answer: "false",
          questionText: "Ai avut dificultate în a respira?"
        },
        {
          id: 8,
          questionText: "Din ce dată ai avut dificultate în a respira?"
        },
        {
          id: 9,
          answer: "false",
          questionText: "Ți-a curs nasul?"
        },
        {
          id: 10,
          questionText: "Din ce dată ţi-a curs nasul?"
        },
        {
          id: 11,
          answer: "true",
          questionText: "Alte simptome:"
        },
        {
          id: 12,
          questionText: "Te rugăm să le descrii",
          answer: "durere de cap"
        },
        {
          id: 13,
          answer: "2",
          questionText: "În momentul de față, te afli în izolare la domiciliu?"
        },
        {
          id: 14,
          answer: "false",
          questionText:
            "În momentul de față, împarți locuința și cu alte persoane?"
        },
        {
          id: 15,
          answer: "undefined",
          questionText:
            "Celelalte persoane din locuință se află în izolare la domiciliu?"
        },
        {
          id: 16,
          answer: "true",
          questionText:
            "Ai ieșit din casă de la ultima completare a formularului?"
        },
        {
          id: 17,
          answer: "Plimbare",
          questionText: "Care a fost motivul deplasării?"
        },
        {
          id: 18,
          answer: "2020-04-16",
          questionText: "Ora plecării:"
        },
        {
          id: 19,
          answer: "2020-04-15",
          questionText: "Ora sosirii:"
        },
        {
          id: 20,
          answer: "false",
          questionText:
            "Ai fost în contact direct cu o persoană diagnosticată/confirmată cu noul coronavirus?"
        }
      ],
      Timestamp: "2020-04-21T11:52:34.863564+00:00",
      timestamp: FORM_TIMESTAMP
    }
  };
};

const expectedAnswerBuilder = () => {
  return {
    temperature: [
      {
        date: FORM_TIMESTAMP_IN_SECS,
        temperature: 38
      }
    ],
    symptoms: [
      {
        id: FORM_TIMESTAMP_IN_SECS,
        date: FORM_TIMESTAMP_IN_SECS,
        cough: true,
        runningNose: false,
        shortnessBreath: false,
        soreThroat: true
      }
    ],
    otherSymptoms: [
      {
        date: FORM_TIMESTAMP_IN_SECS,
        otherSimptoms: "durere de cap"
      }
    ],
    outings: [
      {
        "Contact cu pacient": "Nu",
        "Data/Ora plecării": "2020-04-16",
        "Data/Ora sosirii": "2020-04-15",
        "Motivul deplasării": "Plimbare"
      }
    ]
  };
};

describe("Building the history from form answers", () => {
  it("maps everything correctly", () => {
    const actualHistory = buildHistory([
      { content: JSON.stringify(answerBuilder()) }
    ]);

    expect(actualHistory).toEqual(expectedAnswerBuilder());
  });
});
