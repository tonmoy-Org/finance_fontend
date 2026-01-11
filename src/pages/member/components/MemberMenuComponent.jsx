import React, { useState } from 'react';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Assignment as AssignmentIcon,
    AccountCircle as AccountIcon,
    Notifications as NotificationsIcon,
    HealthAndSafety as HealthIcon,
    Schedule as ScheduleIcon,
    TrendingUp as PerformanceIcon,
    History as HistoryIcon,
    Description as FormIcon,
    Visibility as ReviewIcon,
    CheckCircle as ApprovalIcon,
    Assessment as AssessmentIcon,
    DirectionsCar as VehicleIcon,
    Inventory as InventoryIcon,
    Map as LogisticsIcon,
    LocalShipping as DispatchIcon,
    RequestQuote as QuoteIcon,
    Contacts as LeadsIcon,
    LocationOn as LocateIcon,
    Search as LookupIcon,
    ListAlt as ChecklistIcon,
    Engineering as RepairIcon,
    Star as ScorecardIcon,
    Book as LibraryIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    // Sub-item icons
    Description as ReportIcon,
    Assessment as AssessmentReportIcon,
    Timeline as TimelineIcon,
} from '@mui/icons-material';

export const MemberMenuComponent = ({ onMenuItemClick }) => {
    const [expandedSections, setExpandedSections] = useState({
        'health-reports': false
    });

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const menuItems = [
        // Dashboard & Overview
        {
            sectionName: 'Dashboard & Overview',
            items: [
                { text: 'Dashboard', icon: <DashboardIcon />, path: '/member-dashboard' },
                { text: 'Overview', icon: <AssessmentIcon />, path: '/member-dashboard/overview' },
                { text: 'Notifications', icon: <NotificationsIcon />, path: '/member-dashboard/notifications' },
            ]
        },

        // Dispatch & Logistics
        {
            sectionName: 'Dispatch & Logistics',
            items: [
                { text: 'Dispatch', icon: <DispatchIcon />, path: '/member-dashboard/dispatch' },
                { text: 'Logistics Map', icon: <LogisticsIcon />, path: '/member-dashboard/logistics' },
                { text: 'Locates', icon: <LocateIcon />, path: '/member-dashboard/locates' },
            ]
        },

        // Reports & Compliance - Updated with collapsible health reports
        {
            sectionName: 'Reports & Compliance',
            items: [
                {
                    text: 'Health Department Reports',
                    icon: <HealthIcon />,
                    path: '#',
                    isExpandable: true,
                    sectionId: 'health-reports',
                    expandIcon: <ExpandMoreIcon />,
                    subItems: [
                        {
                            text: 'RME Reports',
                            icon: <ReportIcon />,
                            path: '/member-dashboard/health-department-reports/rme'
                        },
                        {
                            text: 'RSS Reports',
                            icon: <AssessmentReportIcon />,
                            path: '/member-dashboard/health-department-reports/rss'
                        },
                        {
                            text: 'TOS Reports',
                            icon: <TimelineIcon />,
                            path: '/member-dashboard/health-department-reports/tos'
                        }
                    ]
                },
                { text: 'My Scorecard', icon: <ScorecardIcon />, path: '/member-dashboard/my-scorecard' },
            ]
        },

        // Vehicles & Inventory
        {
            sectionName: 'Vehicles & Inventory',
            items: [
                { text: 'Vehicles & Tools', icon: <VehicleIcon />, path: '/member-dashboard/vehicles' },
                { text: 'Inventory', icon: <InventoryIcon />, path: '/member-dashboard/inventory' },
            ]
        },

        // Quotes & Leads
        {
            sectionName: 'Quotes & Leads',
            items: [
                { text: 'Quotes', icon: <QuoteIcon />, path: '/member-dashboard/quotes' },
                { text: 'Leads', icon: <LeadsIcon />, path: '/member-dashboard/leads' },
            ]
        },

        // Technician Management
        {
            sectionName: 'Technician Management',
            items: [
                { text: 'Technicians', icon: <PeopleIcon />, path: '/member-dashboard/techs' },
                { text: 'Scheduling', icon: <ScheduleIcon />, path: '/member-dashboard/techs/schedule' },
                { text: 'Performance', icon: <PerformanceIcon />, path: '/member-dashboard/techs/performance' },
                { text: 'Tech History', icon: <HistoryIcon />, path: '/member-dashboard/techs/history' },
            ]
        },

        // Installations & Repairs
        {
            sectionName: 'Installations & Repairs',
            items: [
                { text: 'Installation Checklists', icon: <ChecklistIcon />, path: '/member-dashboard/installations' },
                { text: 'Tank Repairs', icon: <RepairIcon />, path: '/member-dashboard/tank-repairs' },
            ]
        },

        // Forms & Compliance
        {
            sectionName: 'Forms & Compliance',
            items: [
                { text: 'Forms', icon: <FormIcon />, path: '/member-dashboard/forms' },
                { text: 'Review Forms', icon: <ReviewIcon />, path: '/member-dashboard/forms/review' },
                { text: 'Form Approval', icon: <ApprovalIcon />, path: '/member-dashboard/forms/approval' },
            ]
        },

        // Tasks & Library
        {
            sectionName: 'Tasks & Resources',
            items: [
                { text: 'Tasks', icon: <AssignmentIcon />, path: '/member-dashboard/tasks' },
                { text: 'Library', icon: <LibraryIcon />, path: '/member-dashboard/library' },
                { text: 'Lookup', icon: <LookupIcon />, path: '/member-dashboard/lookup' },
            ]
        },

        // Profile
        {
            sectionName: 'Profile',
            items: [
                { text: 'My Profile', icon: <AccountIcon />, path: '/member-dashboard/profile' },
            ]
        },
    ];

    // Process menu items to add click handlers
    const processedMenuItems = menuItems.map(section => {
        const processedItems = section.items.map(item => {
            if (item.isExpandable) {
                return {
                    ...item,
                    onClick: () => toggleSection(item.sectionId),
                    expanded: expandedSections[item.sectionId] || false,
                    expandIcon: expandedSections[item.sectionId] ? <ExpandLessIcon /> : <ExpandMoreIcon />,
                    subItems: item.subItems.map(subItem => ({
                        ...subItem,
                        onClick: () => onMenuItemClick(subItem.path)
                    }))
                };
            }
            return {
                ...item,
                onClick: () => onMenuItemClick(item.path)
            };
        });

        return {
            ...section,
            items: processedItems
        };
    });

    return processedMenuItems;
};