import {useState,useEffect} from 'react'
import {Nav} from './Nav'
import { motion } from 'framer-motion';
import supabase from './supabaseClient';
import { useStudent } from './StudentContext'; 
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
const IE = [
    { courseCode: 'IE 205', courseDescription: 'المشاغل الهندسية' },
    { courseCode: 'IE 211', courseDescription: 'القياسات' },
    { courseCode: 'IE 213', courseDescription: 'مختبرالقياسات' },
    { courseCode: 'IE 251', courseDescription: 'اساسيات الاحتمالات والاحصاء للمهندسين' },
    { courseCode: 'IE 262', courseDescription: 'علوم المواد الهندسية' },
    { courseCode: 'IE 263', courseDescription: 'مختبر المواد الهندسية' },
    { courseCode: 'IE 300', courseDescription: 'تأهيل وظيفي (3)' },
    { courseCode: 'IE 318', courseDescription: 'قياس وتحليل العمل' },
    { courseCode: 'IE 354', courseDescription: 'الإحصاء الهندسي التطبيقي' },
    { courseCode: 'IE 358', courseDescription: 'بحوث عمليات (1)' },
    { courseCode: 'IE 360', courseDescription: 'ادارة العمليات' },
    { courseCode: 'IE 361', courseDescription: 'إدارة المشاريع الهندسية' },
    { courseCode: 'IE 364', courseDescription: 'تصميم أجزاء الاَلات' },
    { courseCode: 'IE 366', courseDescription: 'عمليات التصنيع (1)' },
    { courseCode: 'IE 367', courseDescription: 'مختبرعمليات التصنيع' },
    { courseCode: 'IE 400', courseDescription: 'تأهيل وظيفي (4)' },
    { courseCode: 'IE 422', courseDescription: 'هندسة العوامل البشرية' },
    { courseCode: 'IE 423', courseDescription: 'مختبر هندسة العوامل البشرية' },
    { courseCode: 'IE 432', courseDescription: 'اقتصاد هندسي' },
    { courseCode: 'IE 454', courseDescription: 'ضبط الجودة الإحصائي' },
    { courseCode: 'IE 458', courseDescription: 'نظم المحاكاة' },
    { courseCode: 'IE 462', courseDescription: 'التصميم والتصنيع باستخدام الحاسوب' },
    { courseCode: 'IE 466', courseDescription: 'عمليات التصنيع (2)' },
    { courseCode: 'IE 478', courseDescription: 'الوثوقية وادامة الصيانة' },
    { courseCode: 'IE 500', courseDescription: 'التدريب الميداني' },
    { courseCode: 'IE 546', courseDescription: 'تخطيط المنشآت' },
    { courseCode: 'IE 556', courseDescription: 'تخطيط نظم التصنيع' },
];
const BME = [
    { courseCode: "BME 300", courseDescription: "علم الميكانيكا الحيوية 1" },
    { courseCode: "BME 340", courseDescription: "نظم التحكم الآلي الحيوي" },
    { courseCode: "BME 356", courseDescription: "الإلكترونيات الطبية الحيوية" },
    { courseCode: "BME 357", courseDescription: "مختبر الإلكترونيات الطبية الحيوية" },
    { courseCode: "BME 362", courseDescription: "الإشارات والنظم الطبية" },
    { courseCode: "BME 366", courseDescription: "الدوائر القابلة للبرمجة و تطبيقاتها الطبية الحيوية" },
    { courseCode: "BME 367", courseDescription: "مختبر الدوائر القابلة للبرمجة ومعالجات التحكم الدقيق" },
    { courseCode: "BME 380", courseDescription: "المجسات الطبية" },
    { courseCode: "BME 390", courseDescription: "معالجة الإشارات الطبية" },
    { courseCode: "BME 391", courseDescription: "مختبر معالجة الإشارات الطبية الحيوية" },
    { courseCode: "BME 393", courseDescription: "مختبر فسيولوجيا الانسان والقراءات الحيوية" },
    { courseCode: "BME 394", courseDescription: "ميكانيكا الموائع الحيوية" },
    { courseCode: "BME 420", courseDescription: "القياسات الطبية" },
    { courseCode: "BME 421", courseDescription: "مختبر القياسات و المجسات الطبية" },
    { courseCode: "BME 422", courseDescription: "مفاهيم التصوير الطبي" },
    { courseCode: "BME 460", courseDescription: "الأجهزة الطبية" },
    { courseCode: "BME 461", courseDescription: "مختبر الأجهزة و المعدات الطبية" },
    { courseCode: "BME 462", courseDescription: "أجهزة التصوير الطبية" },
    { courseCode: "BME 463", courseDescription: "مختبر التصوير الطبي" },
    { courseCode: "BME 464", courseDescription: "نمذجة و تحليل الإشارات الطبية الحيوية" },
    { courseCode: "BME 466", courseDescription: "المحركات الكهربائية و تطبيقاتها في الأجهزة الطبية" },
    { courseCode: "BME 472", courseDescription: "المواد الحيوية" },
    { courseCode: "BME 473", courseDescription: "مختبر الميكانيكا والمواد الحيوية" },
    { courseCode: "BME 496", courseDescription: "ظاهرة الإنتقال الطبي و الديناميكا الحرارية" },
    { courseCode: "BME 498", courseDescription: "مشروع التخرج 1" },
    { courseCode: "BME 500", courseDescription: "التدريب الميداني" },
    { courseCode: "BME 520", courseDescription: "تصميم و صيانة الاجهزة الطبيه الحيويه" },
    { courseCode: "BME 522", courseDescription: "تصميم الاجهزة الطبيه الحيويه" },
    { courseCode: "BME 523", courseDescription: "مختبر صيانة الأجهزة الطبية" },
    { courseCode: "BME 566", courseDescription: "الأعضاء و الأطراف الصناعية" },
    { courseCode: "BME 596", courseDescription: "موضوعات خاصة" },
    { courseCode: "BME 598", courseDescription: "مشروع التخرج 2" },
  ];
  const BMIE = [
    { courseCode: "BMIE 324", courseDescription: "مقدمة في الميكانيكا و المواد الحيوية و تطبيقاتها" },
    { courseCode: "BMIE 350", courseDescription: "برمجة تطبيقية في علم الأحياء الحسابي" },
    { courseCode: "BMIE 352", courseDescription: "مقدمة الى البيولوجيا الجزئية والكيمياء الحيوية" },
    { courseCode: "BMIE 362", courseDescription: "الاقتصاد والإدارة الهندسية" },
    { courseCode: "BMIE 402", courseDescription: "سجلات المريض الإلكترونية" },
    { courseCode: "BMIE 431", courseDescription: "مختبر المعلومات الحيوية 1" },
    { courseCode: "BMIE 432", courseDescription: "طرق إحصائية للمعلوماتية الحيوية1" },
    { courseCode: "BMIE 435", courseDescription: "مختبر تطبيقات الحاسوب في المعلوماتية الحيوية" },
    { courseCode: "BMIE 452", courseDescription: "الخوارزميات و تطبيقاتها للمعلوماتية الحيوية" },
    { courseCode: "BMIE 453", courseDescription: "مختبر الخوارزميات و تطبيقاتها للمعلوماتية الحيوية" },
    { courseCode: "BMIE 455", courseDescription: "مختبر أنظمة قواعد البيانات" },
    { courseCode: "BMIE 498", courseDescription: "مشروع التخرج 1" },
    { courseCode: "BMIE 500", courseDescription: "التدريب الميداني" },
    { courseCode: "BMIE 532", courseDescription: "تصميم و إدارة أنظمة الرعاية الصحية" },
    { courseCode: "BMIE 540", courseDescription: "الشبكات لأنظمة الرعاية الصحية" },
    { courseCode: "BMIE 542", courseDescription: "أمن وسلامة نظم المعلومات الصحية" },
    { courseCode: "BMIE 558", courseDescription: "برمجة متقدمة في المعلوماتية الحيوية" },
    { courseCode: "BMIE 596", courseDescription: "موضوعات خاصة" },
    { courseCode: "BMIE 598", courseDescription: "مشروع التخرج 2" },
  ];
  
const CPE = [


    { courseCode: 'CPE 230', courseDescription: 'المنطق الرقمي' },
    { courseCode: 'CPE 231', courseDescription: 'مختبر المنطق الرقمي' },
    { courseCode: 'CPE 260', courseDescription: 'البرمجة والتصميم الكينوني' },
    { courseCode: 'CPE 260L', courseDescription: 'مختبر البرمجة والتصميم الكينوني' },
    { courseCode: 'CPE 310', courseDescription: 'التحليلات العددية في الهندسة' },
    { courseCode: 'CME 312', courseDescription: 'الإشارات والنظم' },
    { courseCode: 'CME 314', courseDescription: 'الاحتمالات والعمليات العشوائية في الهندسة' },
    { courseCode: 'CPE 344', courseDescription: 'تصميم نظم المعالجات والمتحكمات الدقيقة' },
    { courseCode: 'CPE 345', courseDescription: 'مختبر تصميم نظم المعالجات والمتحكمات الدقيقة' },
    { courseCode: 'CPE 354', courseDescription: 'هيكلة البيانات والخوارزميات' },
    { courseCode: 'CPE 354L', courseDescription: 'مختبر هيكلة البيانات والخوارزميات' },
    { courseCode: 'CPE 442', courseDescription: 'بناء وتنظيم الحاسوب' },
    { courseCode: 'CPE 450', courseDescription: 'تصميم أنظمة قواعد البيانات' },
    { courseCode: 'CPE 450L', courseDescription: 'مختبر تصميم أنظمة قواعد البيانات' },
    { courseCode: 'CME 456', courseDescription: 'أنظمة الاتصالات' },
    { courseCode: 'CPE 460', courseDescription: 'تصميم أنظمة تشغيل الحاسوب' },
    { courseCode: 'CPE 460L', courseDescription: 'مختبر تصميم أنظمة تشغيل الحاسوب' },
    { courseCode: 'CME 462', courseDescription: 'تراسل البيانات' },
    { courseCode: 'CPE 570', courseDescription: 'المعالجات المتوازية' },
  ];
  const AE = [
    { courseCode: "AE 114", courseDescription: "الرسم المعماري" },
    { courseCode: "AE 121", courseDescription: "مدخل إلى التصميم المعماري (1)" },
    { courseCode: "AE 214", courseDescription: "الرسم والتصميم بالحاسوب (1)" },
    { courseCode: "AE 221", courseDescription: "التصميم المعماري (1)" },
    { courseCode: "AE 222", courseDescription: "التصميم المعماري (2)" },
    { courseCode: "AE 233", courseDescription: "إنشاء المباني" },
    { courseCode: "AE 243", courseDescription: "تاريخ ونظريات العمارة" },
    { courseCode: "AE 315", courseDescription: "الرسومات التنفيذية" },
    { courseCode: "AE 321", courseDescription: "التصميم المعماري (3)" },
    { courseCode: "AE 333", courseDescription: "ميكانيكا الإنشاء (لطلبة العمارة)" },
    { courseCode: "AE 342", courseDescription: "السلوك الإنساني في البيئة العمرانية" },
    { courseCode: "AE 421", courseDescription: "التصميم المعماري (5) تصميم حضري" },
    { courseCode: "AE 451", courseDescription: "نظريات التصميم المستدام و العمارة الخضراء" },
    { courseCode: "AE 473", courseDescription: "فيزياء عمارة \"الإضاءة والصوتيات، الحرارة و الرطوبة\"" },
    { courseCode: "AE 475", courseDescription: "أنظمة ميكانيكية وكهربائية" },
    { courseCode: "AE 482", courseDescription: "المواصفات والعقود وحساب الكميات" },
    { courseCode: "AE 484", courseDescription: "ادارة المشاريع" },
    { courseCode: "AE 500", courseDescription: "التدريب الميداني" },
    { courseCode: "AE 511", courseDescription: "تطبيقات متقدمة بالحاسوب" },
    { courseCode: "AE 531", courseDescription: "تطبيقات متقدمة في التصميم المعماري والإنشائي (مرسم)" },
    { courseCode: "AE 542", courseDescription: "العمارة في العهد الإسلامي (662-1500 م)" },
    { courseCode: "AE 545", courseDescription: "العمارة المحلية" },
    { courseCode: "AE 550", courseDescription: "قضايا معاصرة في مجال التنسيق المعماري" }
  ];
  const EPE = [
    { courseCode: "EPE 220", courseDescription: "دوائر كهربائية 1" },
    { courseCode: "EPE 222", courseDescription: "دوائر كهربائية 2" },
    { courseCode: "EPE 223", courseDescription: "مختبر دوائر كهربائية" },
    { courseCode: "EPE 320", courseDescription: "أنظمة التحكم الآلي" },
    { courseCode: "EPE 321", courseDescription: "مختبر أنظمة التحكم الآلي" },
    { courseCode: "EPE 350", courseDescription: "المحولات وآلات التيار المستمر" },
    { courseCode: "EPE 352", courseDescription: "الكترونيات القوى 1" },
    { courseCode: "EPE 353", courseDescription: "مختبر الكترونيات القوى 1" },
    { courseCode: "EPE 354", courseDescription: "الالات الكهربائية" },
    { courseCode: "EPE 360", courseDescription: "تحليل أنظمة القوى 1" },
    { courseCode: "EPE 440", courseDescription: "أجهزة وقياسات" },
    { courseCode: "EPE 441", courseDescription: "مختبر أجهزة وقياسات" },
    { courseCode: "EPE 452", courseDescription: "آلات التيار المتغير" },
    { courseCode: "EPE 453", courseDescription: "مختبر الآلات الكهربائية" },
    { courseCode: "EPE 460", courseDescription: "تحليل أنظمة القوى 2" },
    { courseCode: "EPE 461", courseDescription: "مختبر تطبيقات الحاسوب في أنظمة القوى" },
    { courseCode: "EPE 462", courseDescription: "وقاية أنظمة القوى" },
    { courseCode: "EPE 463", courseDescription: "مختبر وقاية أنظمة القوى" },
    { courseCode: "EPE 470", courseDescription: "هندسة الضغط العالي 1" },
    { courseCode: "EPE 500", courseDescription: "التدريب الميداني" },
    { courseCode: "EPE 520", courseDescription: "الشبكات الذكية" },
    { courseCode: "EPE 556", courseDescription: "أنظمة القيادة الكهربائية" },
    { courseCode: "EPE 560", courseDescription: "أنظمة التوزيع الكهربائية" },
    { courseCode: "EPE 562", courseDescription: "استقرارية أنظمة القوى والتحكم" },
    { courseCode: "EPE 566", courseDescription: "تصميم أنظمة القوى الكهربائية" },
  ];
const CME = [
    { courseCode: 'CME 216', courseDescription: 'طرق التحليل الهندسي' },
    { courseCode: 'CME 310', courseDescription: 'التحليلات العددية في الهندسة' },
    { courseCode: 'CME 312', courseDescription: 'الإشارات والنظم' },
    { courseCode: 'CME 314', courseDescription: 'الاحتمالات والعمليات العشوائية في الهندسة' },
    { courseCode: 'CME 342', courseDescription: 'الكهرومغناطيسية الهندسية' },
    { courseCode: 'CME 442', courseDescription: 'الأمواج والمجالات الكهرومغناطيسية' },
    { courseCode: 'CME 450', courseDescription: 'الاتصالات التماثلية' },
    { courseCode: 'CME 451', courseDescription: 'مختبر الاتصالات التماثلية' },
    { courseCode: 'CME 452', courseDescription: 'الاتصالات الرقمية' },
    { courseCode: 'CME 453', courseDescription: 'مختبر الاتصالات الرقمية' },
    { courseCode: 'CME 454', courseDescription: 'معالجة الإشارة الرقمية' },
    { courseCode: 'CME 455', courseDescription: 'مختبر معالجة الإشارة الرقمية' },
    { courseCode: 'CME 456', courseDescription: 'انظمة الاتصالات' },
    { courseCode: 'CME 457', courseDescription: 'مختبر انظمة الاتصالات' },
    { courseCode: 'CME 460', courseDescription: 'اتصالات الألياف الضوئية' },
    { courseCode: 'CME 461', courseDescription: 'مختبر اتصالات الألياف الضوئية' },
    { courseCode: 'CME 462', courseDescription: 'تراسل البيانات' },
    { courseCode: 'CME 500', courseDescription: 'التدريب الميداني' },
    { courseCode: 'CME 548', courseDescription: 'الهوائيات وانتشار الأمواج' },
    { courseCode: 'CME 549', courseDescription: 'مختبر الهوائيات والميكرويف' },
    { courseCode: 'CME 556', courseDescription: 'النقل في أنظمة الاتصالات' },
    { courseCode: 'CME 568', courseDescription: 'أنظمة الاتصالات المتحركة' },
];
const ELE=[
    {"courseCode": "ELE 202", "courseDescription": "الرسم الهندسي باستخدام الحاسوب"},
    {"courseCode": "ELE 206", "courseDescription": "الكتابة التقنية وأخلاقيات الهندسة"},
    {"courseCode": "ELE 220", "courseDescription": "الدوائر الالكترونية"},
    {"courseCode": "ELE 250", "courseDescription": "الكترونيات (1)"},
    {"courseCode": "ELE 251", "courseDescription": "مختبر الكترونيات (1)"},
    {"courseCode": "ELE 340", "courseDescription": "الكترونيات اشباه الموصلات"},
    {"courseCode": "ELE 350", "courseDescription": "الكترونيات (2)"},
    {"courseCode": "ELE 351", "courseDescription": "مختبر الكترونيات (2)"},
    {"courseCode": "ELE 352", "courseDescription": "التصميم والتصنيع الالكتروني"},
    {"courseCode": "ELE 353", "courseDescription": "مختبر التصميم والتصنيع الالكتروني"},
    {"courseCode": "ELE 402", "courseDescription": "التصميم بمساعدة الحاسوب"},
    {"courseCode": "ELE 440", "courseDescription": "البصريات الالكترونية"},
    {"courseCode": "ELE 448", "courseDescription": "مقدمه في تصميم الدوائر المتكاملة ذات النطاق الواسع"},
    {"courseCode": "ELE 449", "courseDescription": "تصميم دارات التكامل الفائقة"},
    {"courseCode": "ELE 450", "courseDescription": "الالكترونيات الرقمية"},
    {"courseCode": "ELE 451", "courseDescription": "مختبر الالكترونيات الرقمية"},
    {"courseCode": "ELE 452", "courseDescription": "الدوائر المتكاملة"},
    {"courseCode": "ELE 454", "courseDescription": "القياسات التخصصية"},
    {"courseCode": "ELE 455", "courseDescription": "مختبر القياسات التخصصية"},
    {"courseCode": "ELE 456", "courseDescription": "الكترونيات (3)"},
    {"courseCode": "ELE 458", "courseDescription": "مصادر الجهد و المنظمات"},
    {"courseCode": "ELE 500", "courseDescription": "التدريب الميداني"},
    {"courseCode": "ELE 551", "courseDescription": "مختبر الصيانة الالكترونية و الحاسوب"},
    {"courseCode": "ELE 574", "courseDescription": "الكترونيات الاتصالات"}
]
const ME = [
    { courseCode: "ME 228", courseDescription: "مختبر ميكانيكا المواد" },
    { courseCode: "ME 422", courseDescription: "مختبر والاهتزازات و نظرية الالات" },
    { courseCode: "ME 341", courseDescription: "مكانيكا الموائع" },
    { courseCode: "ME 227", courseDescription: "ميكانيكا المواد" },
    { courseCode: "ME 207", courseDescription: "رسم الالات بالحاسوب" },
    { courseCode: "ME 326", courseDescription: "نظرية الالات" },
    { courseCode: "ME 202", courseDescription: "الديناميكا" },
    { courseCode: "ME 425", courseDescription: "تصميم الميكانيكي (2)" },
    { courseCode: "ME 428", courseDescription: "الهندسة العكسية" },
    { courseCode: "ME 353", courseDescription: "انتقال حرارة" },
    { courseCode: "ME 524", courseDescription: "مقدمة في تصميم السيارات" },
    { courseCode: "ME 521", courseDescription: "تريبولوجي" },
    { courseCode: "ME 562", courseDescription: "ميكانيكا المواد المركبة" },
  ];
  const CE = [
    { courseCode: "CE 200", courseDescription: "الرسم الهندسي" },
    { courseCode: "CE 201", courseDescription: "ستاتيكا" },
    { courseCode: "CE 202", courseDescription: "ديناميكا" },
    { courseCode: "CE 203", courseDescription: "مقاومة المواد" },
    { courseCode: "CE 206", courseDescription: "ميكانيكا هندسية" },
    { courseCode: "CE 210", courseDescription: "الإحصاء والاحتمالات لطلبة الهندسة" },
    { courseCode: "CE 261", courseDescription: "جيولوجيا هندسية" },
    { courseCode: "CE 262", courseDescription: "جيولوجيا" },
    { courseCode: "CE 321", courseDescription: "علم المواد" },
    { courseCode: "CE 323", courseDescription: "مواد الإنشاء" },
    { courseCode: "CE 326", courseDescription: "مختبر مواد الانشاء" },
    { courseCode: "CE 331", courseDescription: "انشاء المباني" },
    { courseCode: "CE 332", courseDescription: "تحليل انشائي 1" },
    { courseCode: "CE 341", courseDescription: "المساحــه" },
    { courseCode: "CE 343", courseDescription: "مختبر المساحـــه" },
    { courseCode: "CE 345", courseDescription: "هندسة المواصلات" },
    { courseCode: "CE 351", courseDescription: "ميكانيكا الموائع للهندسة المدنية" },
    { courseCode: "CE 352", courseDescription: "الهيدروليكا والهيدرولجيا" },
    { courseCode: "CE 354", courseDescription: "مختبر ميكانيكا الموائع والهيدروليكا" },
    { courseCode: "CE 362", courseDescription: "هندسة التربه" },
    { courseCode: "CE 363", courseDescription: "مختبر هندسة التربه" },
    { courseCode: "CE 364", courseDescription: "الهندسة الجيوتقنية" },
    { courseCode: "CE 370", courseDescription: "الإدارة والاقتصاد الهندسي" },
    { courseCode: "CE 371", courseDescription: "الإدارة والاقتصاد الهندسي" },
    { courseCode: "CE 431", courseDescription: "تحليل انشائي 2" },
    { courseCode: "CE 432", courseDescription: "خرسانه مسلحه 1" },
    { courseCode: "CE 434", courseDescription: "تصميم منشآت معدنيه" }
  ];
  const MATH=[
    { courseCode: "MATH 101", courseDescription: "تفاضل وتكامل (1)" },
    { courseCode: "MATH 102", courseDescription: "تفاضل وتكامل (2)" },
    { courseCode: "MATH 201", courseDescription: "تحليل وسيــط (1)" },
    { courseCode: "SCC 255", courseDescription: "معادلات تفاضلية عادية" },
    { courseCode: "MATH 241", courseDescription: "جبـر خطـي (1)" },
    { courseCode: "MATH 152", courseDescription: "الرياضيات المتقطعة" },
  ]
export function Form({ scrollToHome, scrollToDonation, scrollToForm, scrollToAboutUs }) {
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [isInView, setIsInView] = useState(false); 
    const {student }=useStudent();
    const [name,setName]=useState("");
    const [studentID, setStuedntID]=useState("");
    const [specialization, setSpecialization]=useState("");
    const [course,setCourse]=useState("");
    const [type, setType]=useState("");
    const [link,setLink]=useState("");
    useEffect(() => {
      const storedName = localStorage.getItem('name');
      const storedStudentID = localStorage.getItem('studentID');
      if (storedName) {
        setName(storedName);
      }
      if (storedStudentID) {
        setStuedntID(storedStudentID);
      }
    }, []);
    const handleScroll = () => {
        const triggerPoint =student==="student"?window.innerHeight*2 / 1.6:window.innerHeight/1.6; 
        if (window.scrollY > triggerPoint) {
            setIsInView(true);
        } else {
            setIsInView(false);
        }
    };
    const handleSubmit = async (e) => {
      e.preventDefault("");
      setCourse("");
      setType("");
      setLink("");
      setSpecialization("")
      const notyf = new Notyf();
      notyf.success({
        message: 'تمت العملية بنجاح, بارك الله فيك',
        position: { x: 'center', y: 'top' } // Correct usage for position
      });
      localStorage.setItem('name', name);
      localStorage.setItem('studentID', studentID);
    
      const id = `${new Date().getTime()}-${course}`;  
    
    
      try {
    
        const { data: studentData, error: studentError } = await supabase
          .from('student') //
          .select('student_id, submission_count')
          .eq('student_id', studentID)  
          .single();  
    
        if (studentError) {
         
          if (studentError.code === 'PGRST116') { 
            
            

            const { data: insertData, error: insertError } = await supabase
              .from('student')
              .insert([
                {
                  student_id: studentID,
                  full_name: name,
                  submission_count: 1, 
                }
              ]);
    
            if (insertError) {
              throw insertError;
            } else {
              console.log('New student inserted:', insertData);
            }
          }
        } else {
          // Step 2: If student exists, update the submission count
          console.log('Student found, updating submission count');
          const updatedSubmissionCount = studentData.submission_count + 1;  // Increment submission count
    
          const { data: updateData, error: updateError } = await supabase
            .from('student')
            .update({ submission_count: updatedSubmissionCount })
            .eq('student_id', studentID);  
    
          if (updateError) {
            throw updateError;
          } else {
            console.log('Submission count updated:', updateData);
          }
        }
    
     
        const { data, error } = await supabase
          .from('submission') 
          .insert([
            {
              ID: id,  
              specialization: specialization,
              course: course,
              type: type,
              link: link
            }
          ]);
    
        if (error) {
          throw error;
        } else {
          console.log('Submission data inserted:', data);
        }
      } catch (err) {
        console.error('Error:', err.message);
      }
    };
    
 
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleSpecializationChange =(Specialize)=>{
      setSpecialization(Specialize.target.value);
    switch (Specialize.target.value) {
        case 'CPE':
            setSelectedCourse(CPE);
            break;
            case "IE":
                setSelectedCourse(IE);
              break;  
              case "ELE":
                setSelectedCourse(ELE);
              break;   
              case "CME":
                setSelectedCourse(CME);
              break;   
              case "EPE":
                setSelectedCourse(EPE);
              break;   
              case "BME":
                setSelectedCourse(BME);
              break;   
              case "BMIE":
                setSelectedCourse(BMIE);
              break; 
              case "CE":
                setSelectedCourse(CE);
              break; 
              case "AE":
                setSelectedCourse(AE);
              break; 
              case "ME":
                setSelectedCourse(ME);
              break; 
              case "MATH":
                setSelectedCourse(MATH);
              break;
    }
            
    }
    
  
  return (
    <div>
     <Nav 
            scrollToHome={scrollToHome} 
            scrollToDonation={scrollToDonation} 
            scrollToForm={scrollToForm} 
            scrollToAboutUs={scrollToAboutUs} 
          />
    <div className='w-screen text-lg relative h-screen overflow-x-hidden justify-center items-center flex flex-col bg-slate-50'>
      <div className='absolute bg-slate-600 right-0 rounded-br-full lg:rounded-br-none rounded-bl-full lg:w-[65%] w-full h-[54px] lg:h-[60px] top-0'></div>
      <motion.form
      onSubmit={handleSubmit}
        type="submit"
        className='gap-3 flex flex-col w-[70%] max-w-[300px]'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
        transition={{ duration: 0.6 }}
      >
       {student==="student"&&( <motion.input
          required
          onChange={(e)=>{setName(e.target.value)}}
          type='text'
          value={name}
          className='text-center bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='الاسم الثلاثي'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.5 }}
        />)}
        {student==="student"&&(<motion.input
          required
          value={studentID}
          onChange={(e)=>{setStuedntID(e.target.value)}}
          type='text'
          className='text-center bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='الرقم الجامعي'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.5 }}
        />)}
        <div className='text-center w-full'>
          <motion.select
            required
            value={specialization}
            className="text-center cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            aria-label="Default select example text-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.5 }}
            onChange={handleSpecializationChange}
          >
            <option className='text-sm cursor-pointer' value=""  defaultValue>التخصص</option>
            <option className='text-sm cursor-pointer' value="CPE">هندسة الحاسوب</option>
            <option className='text-sm cursor-pointer' value="ELE">هندسة الإلكترونيات</option>
            <option className='text-sm cursor-pointer' value="CME">هندسة الاتصالات</option>
            <option className='text-sm cursor-pointer' value="MATH">الرياضيات</option>
            <option className='text-sm cursor-pointer' value="EPE">هندسة القوى الكهربائية</option>
            <option className='text-sm cursor-pointer' value="BME">هندسة النظم الطبية الحيوية</option>
            <option className='text-sm cursor-pointer' value="BMIE">هندسة المعلوماتية الطبية الحيوية</option>
            <option className='text-sm cursor-pointer' value="CE">الهندسة المدنية</option>
            <option className='text-sm cursor-pointer' value="AE">هندسة العمارة</option>
            <option className='text-sm cursor-pointer' value="IE">الهندسة الصناعية</option>
            <option className='text-sm cursor-pointer' value="ME">الهندسة الميكانيكية</option>
          </motion.select>
        </div>
        <div className='text-center w-full'>
          <motion.select
            required
            className="text-center custom-select  justify-center cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            aria-label="Default select example"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.5 }}
            value={course}
            onChange={(e)=>{setCourse(e.target.value)}}
          >
            <option className='text-sm' value=""  defaultValue>المادة</option>
            {selectedCourse.map((course, index) => (
              <option className='text-sm' key={index} value={course.courseCode}>{course.courseCode} - {course.courseDescription}</option>
            ))}
          </motion.select>
        </div>
        <div className='text-center w-full'>
          <motion.select
            required
            value={type}
            onChange={(e)=>{setType(e.target.value)}}
            className="text-center  justify-center bg-gray-50 cursor-pointer border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            aria-label="Default select example text-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.5 }}
          >
            <option className='text-sm cursor-pointer' value=""  defaultValue> نوع المحتوى</option>
            <option className='text-sm cursor-pointer' >كتاب</option>
            <option className='text-sm cursor-pointer' value="1">محاضرات</option>
            <option className='text-sm cursor-pointer' value="2">ملخصات</option>
            <option className='text-sm cursor-pointer' value="3">دوسيات</option>
            <option className='text-sm cursor-pointer' value="4">سنوات</option>
          </motion.select>
        </div>
        <motion.input
          required
          type='text'
          className='text-center bg-gray-50 border  border-gray-300 text-gray-900 py-4 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='(رابط واحد في كل مرة) الرابط'
          onChange={(e)=>{setLink(e.target.value)}}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.5 }}
        />
        <div className='flex justify-center items-center mt-2'>
          <motion.button
            type="submit"
            className='sm:px-6 px-2 w-[70%] flex justify-center hover:scale-105 bg-indigo-600 text-white shadow-lg rounded-lg sm:py-1.5 py-1 hover:bg-indigo-700 text-center'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.5 }}
          >
            تسليم
          </motion.button>
        </div>
        <p className='text-sm text-center text-gray-500 mt-2'>
          ملاحظة: إذا لم يكن لديك رابط، يمكنك نشر المحتوى على جوجل درايف والتأكد أنه عام، ثم ضع الرابط هنا.
        </p>
      </motion.form>
    </div>
  </div>
);
}

