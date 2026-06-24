import { FiCheckCircle, FiInfo } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { ToastContentProps, toast } from 'react-toastify';

const COLOR_MAP = {
    success: {
        iconBg: '#4df0b0',
        iconColor: '#0b0f19',
        innerGradientStart: '#064e3b',
        innerGradientEnd: 'rgba(6, 78, 59, 0.1)',
        outerGradientStart: 'rgba(77, 240, 176, 0.2)',
        outerGradientEnd: 'rgba(77, 240, 176, 0.02)',
    },
    error: {
        iconBg: '#ef4444',
        iconColor: '#ffffff',
        innerGradientStart: '#991b1b',
        innerGradientEnd: 'rgba(153, 27, 27, 0.1)',
        outerGradientStart: 'rgba(239, 68, 68, 0.2)',
        outerGradientEnd: 'rgba(239, 68, 68, 0.02)',
    },
    warning: {
        iconBg: '#f59e0b',
        iconColor: '#ffffff',
        innerGradientStart: '#92400e',
        innerGradientEnd: 'rgba(146, 64, 14, 0.1)',
        outerGradientStart: 'rgba(245, 158, 11, 0.2)',
        outerGradientEnd: 'rgba(245, 158, 11, 0.02)',
    },
};

const getIconByTypeForNewToast = (type: 'success' | 'error' | 'warning') => {
    const ICON_TO_COMP = {
        success: FiCheckCircle,
        error: IoClose,
        warning: FiInfo,
    };
    const Icon = ICON_TO_COMP[type];
    const colors = COLOR_MAP[type];
    return (
        <div
            className="h-[34px] aspect-square rounded-full flex justify-center items-center shrink-0"
            style={{
                background: `linear-gradient(to bottom, ${colors.outerGradientStart}, ${colors.outerGradientEnd})`,
            }}
        >
            <div
                className="h-[28px] aspect-square rounded-full flex justify-center items-center"
                style={{
                    background: `linear-gradient(to bottom, ${colors.innerGradientStart}, ${colors.innerGradientEnd})`,
                }}
            >
                <Icon
                    size={20}
                    style={{
                        background: colors.iconBg,
                        color: colors.iconColor,
                        borderRadius: '50%',
                        padding: '3px',
                    }}
                />
            </div>
        </div>
    );
};

const ToastMessage = ({
    data: { title, subtitle, hideIcon = false, type },
    closeToast,
}: ToastContentProps<{
    title: string;
    subtitle?: string;
    hideIcon?: boolean;
    type?: 'success' | 'error' | 'warning';
}>) => {
    return (
        <div className="flex items-center w-full gap-x-3">
            {!hideIcon && getIconByTypeForNewToast(type ?? 'warning')}
            <div className="flex flex-col gap-y-0.5 text-left flex-1 min-w-0">
                <div className="font-semibold text-sm text-white leading-tight">{title}</div>
                {subtitle && <div className="text-xs text-gray-400 leading-normal">{subtitle}</div>}
            </div>
            <button
                onClick={closeToast}
                className="text-gray-400 hover:text-white transition-colors ml-auto p-1.5 rounded-lg hover:bg-white/5 flex items-center justify-center shrink-0"
                aria-label="Close toast"
            >
                <IoMdClose size={18} />
            </button>
        </div>
    );
};

export const showToast = ({
    type,
    title,
    subtitle,
    hideIcon,
    autoClose,
    isLoading = false,
}: {
    type: 'success' | 'error' | 'warning';
    title: string;
    subtitle?: string;
    hideIcon?: boolean;
    autoClose?: number;
    isLoading?: boolean;
}) => {
    toast(ToastMessage, {
        data: {
            type,
            title,
            subtitle,
            hideIcon,
            isLoading,
        },
        autoClose,
        className: '!bg-[#0b0f19]/90 !backdrop-blur-md !border !border-slate-800 !rounded-xl !shadow-[0_8px_32px_rgb(0,0,0,0.5)] !p-4 !w-[clamp(350px,90vw,480px)] !min-h-[64px] !flex !items-center !justify-between',
        closeButton: false,
        hideProgressBar: true,
        position: 'top-center',
        isLoading,
    });
};
