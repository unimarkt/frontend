import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 h-screen w-24 bg-gray-50 flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <img src="/img/logo.png" alt="UniMart" className="w-8 h-8 mb-8 cursor-pointer" onClick={() => navigate('/')} />
      
      {/* Menu Items - выравнивание по центру экрана */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        {/* Home */}
        <div className="relative group">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 17.5002H16M11.0177 3.26424L4.23539 8.53937C3.78202 8.89199 3.55534 9.0683 3.39203 9.2891C3.24737 9.48469 3.1396 9.70503 3.07403 9.9393C3 10.2038 3 10.4909 3 11.0653V18.3002C3 19.4203 3 19.9804 3.21799 20.4082C3.40973 20.7845 3.71569 21.0905 4.09202 21.2822C4.51984 21.5002 5.07989 21.5002 6.2 21.5002H17.8C18.9201 21.5002 19.4802 21.5002 19.908 21.2822C20.2843 21.0905 20.5903 20.7845 20.782 20.4082C21 19.9804 21 19.4203 21 18.3002V11.0653C21 10.4909 21 10.2038 20.926 9.9393C20.8604 9.70503 20.7526 9.48469 20.608 9.2891C20.4447 9.0683 20.218 8.89199 19.7646 8.53937L12.9823 3.26424C12.631 2.99099 12.4553 2.85436 12.2613 2.80184C12.0902 2.7555 11.9098 2.7555 11.7387 2.80184C11.5447 2.85436 11.369 2.99099 11.0177 3.26424Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 top-1/2 transform -translate-y-1/2">
            Домой
          </div>
        </div>
        
        {/* Products */}
        <div className="relative group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors" onClick={() => navigate('/products')}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_10003_151)">
                <path d="M4 8.5H20V5.5H4V8.5ZM14 19.5V10.5H10V19.5H14ZM16 19.5H20V10.5H16V19.5ZM8 19.5V10.5H4V19.5H8ZM3 3.5H21C21.2652 3.5 21.5196 3.60536 21.7071 3.79289C21.8946 3.98043 22 4.23478 22 4.5V20.5C22 20.7652 21.8946 21.0196 21.7071 21.2071C21.5196 21.3946 21.2652 21.5 21 21.5H3C2.73478 21.5 2.48043 21.3946 2.29289 21.2071C2.10536 21.0196 2 20.7652 2 20.5V4.5C2 4.23478 2.10536 3.98043 2.29289 3.79289C2.48043 3.60536 2.73478 3.5 3 3.5Z" className="group-hover:fill-white" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_10003_151">
                  <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 top-1/2 transform -translate-y-1/2">
            Продукты
          </div>
        </div>
        
        {/* Separator */}
        <div className="w-8 h-px bg-gray-300"></div>
        
        {/* Editor */}
        <div className="relative group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors" onClick={() => navigate('/constructor')}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_10002_160)">
                <path d="M16.757 3.5001L14.757 5.5001H5V19.5001H19V9.7431L21 7.7431V20.5001C21 20.7653 20.8946 21.0197 20.7071 21.2072C20.5196 21.3947 20.2652 21.5001 20 21.5001H4C3.73478 21.5001 3.48043 21.3947 3.29289 21.2072C3.10536 21.0197 3 20.7653 3 20.5001V4.5001C3 4.23488 3.10536 3.98053 3.29289 3.79299C3.48043 3.60545 3.73478 3.5001 4 3.5001H16.757ZM20.485 2.6001L21.9 4.0161L12.708 13.2081L11.296 13.2111L11.294 11.7941L20.485 2.6001Z" className="group-hover:fill-white" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_10002_160">
                  <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 top-1/2 transform -translate-y-1/2">
            Конструктор
          </div>
        </div>
        
        {/* Design */}
        <div className="relative group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors" onClick={() => navigate('/templates')}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_10002_167)">
                <path d="M15.456 10.1778L15.314 10.0358C14.6448 9.39057 13.8223 8.92631 12.924 8.68685C10.017 7.90885 7.225 9.55585 6.432 12.5168C6.389 12.6768 6.366 12.8568 6.328 13.3078C6.174 15.1778 5.734 16.5729 4.528 17.9879C6.788 18.8759 9.466 19.5019 11.502 19.5019C12.7123 19.5003 13.8883 19.1 14.8482 18.3629C15.8081 17.6257 16.4983 16.5928 16.812 15.4238C17.0583 14.5068 17.0629 13.5415 16.8253 12.6222C16.5876 11.7028 16.1159 10.8607 15.456 10.1778ZM13.29 6.71585L18.229 2.87485C18.4213 2.72547 18.6615 2.65138 18.9045 2.66648C19.1475 2.68157 19.3767 2.78482 19.549 2.95685L22.544 5.95085C22.7163 6.12322 22.8197 6.35259 22.8348 6.59584C22.8499 6.8391 22.7757 7.07949 22.626 7.27185L18.786 12.2098C19.0568 13.3143 19.073 14.4657 18.8335 15.5773C18.5941 16.689 18.1052 17.7316 17.4037 18.6266C16.7022 19.5215 15.8066 20.2454 14.7843 20.7435C13.7621 21.2416 12.6401 21.5009 11.503 21.5019C8 21.5019 3.5 19.9998 1 18.4998C4.98 15.4998 4.047 13.6898 4.5 11.9998C5.558 8.04985 9.342 5.74285 13.289 6.71585H13.29ZM16.703 8.59485C16.768 8.65785 16.833 8.72285 16.896 8.78885L18.031 9.92285L20.506 6.74085L18.76 4.99485L15.578 7.46985L16.703 8.59485Z" className="group-hover:fill-white" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_10002_167">
                  <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 top-1/2 transform -translate-y-1/2">
            Шаблоны
          </div>
        </div>
        
        {/* Separator */}
        <div className="w-8 h-px bg-gray-300"></div>
        
        {/* Analytics */}
        <div className="relative group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors" onClick={() => navigate('/analytics')}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_10003_176)">
                <path d="M2 13.5H8V21.5H2V13.5ZM16 8.5H22V21.5H16V8.5ZM9 3.5H15V21.5H9V3.5ZM4 15.5V19.5H6V15.5H4ZM11 5.5V19.5H13V5.5H11ZM18 10.5V19.5H20V10.5H18Z" className="group-hover:fill-white" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_10003_176">
                  <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 top-1/2 transform -translate-y-1/2">
            Аналитика
          </div>
        </div>
        
        {/* Links */}
        <div className="relative group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.0598 8.61023L14.4748 10.0252C15.1249 10.6753 15.6405 11.447 15.9924 12.2963C16.3442 13.1456 16.5253 14.0559 16.5253 14.9752C16.5253 15.8945 16.3442 16.8049 15.9924 17.6542C15.6405 18.5035 15.1249 19.2752 14.4748 19.9252L14.1208 20.2782C12.8079 21.5911 11.0274 22.3286 9.17077 22.3286C7.31416 22.3286 5.53359 21.5911 4.22077 20.2782C2.90795 18.9654 2.17041 17.1848 2.17041 15.3282C2.17041 13.4716 2.90795 11.6911 4.22077 10.3782L5.63577 11.7932C5.16814 12.2568 4.79667 12.8081 4.5427 13.4156C4.28872 14.0231 4.15724 14.6748 4.1558 15.3333C4.15435 15.9917 4.28298 16.644 4.53429 17.2526C4.78561 17.8612 5.15465 18.4142 5.62025 18.8798C6.08585 19.3453 6.63882 19.7144 7.24743 19.9657C7.85603 20.217 8.50828 20.3456 9.16673 20.3442C9.82518 20.3428 10.4769 20.2113 11.0844 19.9573C11.6919 19.7033 12.2432 19.3319 12.7068 18.8642L13.0608 18.5102C13.9981 17.5726 14.5247 16.3011 14.5247 14.9752C14.5247 13.6494 13.9981 12.3779 13.0608 11.4402L11.6458 10.0252L13.0608 8.61123L13.0598 8.61023ZM19.7778 14.6212L18.3638 13.2072C18.8314 12.7437 19.2029 12.1923 19.4568 11.5848C19.7108 10.9773 19.8423 10.3256 19.8437 9.6672C19.8452 9.00875 19.7166 8.3565 19.4652 7.74789C19.2139 7.13928 18.8449 6.58631 18.3793 6.12071C17.9137 5.65512 17.3607 5.28607 16.7521 5.03476C16.1435 4.78345 15.4913 4.65482 14.8328 4.65626C14.1744 4.6577 13.5227 4.78919 12.9152 5.04316C12.3077 5.29714 11.7563 5.6686 11.2928 6.13623L10.9388 6.49023C10.0014 7.42787 9.47484 8.69941 9.47484 10.0252C9.47484 11.3511 10.0014 12.6226 10.9388 13.5602L12.3538 14.9752L10.9388 16.3892L9.52477 14.9752C8.87468 14.3252 8.359 13.5535 8.00717 12.7042C7.65535 11.8549 7.47426 10.9445 7.47426 10.0252C7.47426 9.10592 7.65535 8.19561 8.00717 7.34628C8.359 6.49696 8.87468 5.72525 9.52477 5.07523L9.87877 4.72223C11.1916 3.40941 12.9722 2.67188 14.8288 2.67188C16.6854 2.67188 18.4659 3.40941 19.7788 4.72223C21.0916 6.03505 21.8291 7.81562 21.8291 9.67223C21.8291 11.5288 21.0916 13.3094 19.7788 14.6222L19.7778 14.6212Z" className="group-hover:fill-white" fill="currentColor"/>
            </svg>
          </div>
          <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 top-1/2 transform -translate-y-1/2">
            Работа с API
          </div>
        </div>
        
        {/* Separator */}
        <div className="w-8 h-px bg-gray-300"></div>
        
        {/* Trash */}
        <div className="relative group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors" onClick={() => navigate('/basket')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_9893_1424)">
                <path d="M17 6H22V8H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V8H2V6H7V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H16C16.2652 2 16.5196 2.10536 16.7071 2.29289C16.8946 2.48043 17 2.73478 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" className="group-hover:fill-white" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_9893_1424">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 top-1/2 transform -translate-y-1/2">
            Корзина
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 