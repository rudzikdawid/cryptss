import {animate, group, query, stagger, style, transition, trigger} from "@angular/animations";

export const slideInAnimation =
    trigger('slideInAnimation', [
        transition('* => AddConversation', [
            query(':leave', [
                style({ opacity: 1})
            ], { optional: true }),
            query(':leave button.add-channel .mat-button-wrapper', [
                    style({ 'opacity': '0' }),
                ], { optional: true }
            ),
            query(':enter', [
                style({ opacity: 0})
            ], { optional: true }),
            group([
                query(':leave button.add-channel', [
                    style({ 'transform': 'translateZ(1px) scale(1)'}),
                    animate('300ms ease-in-out', style({ 'transform': 'translateZ(1px) scale(50)'})),
                ], { optional: true }),
                query(':leave', [
                    style({ opacity: 1 }),
                    animate('300ms 250ms ease-in-out', style({opacity: 0})),
                ], { optional: true }),
                query(':enter', [
                    style({ opacity: 0 }),
                    animate('300ms 150ms ease-out', style({opacity: 1}))
                ], { optional: true })
            ])
        ]),
        transition('* <=> *', [
            query(':enter', [
                style({ opacity: 0})
            ], { optional: true }),
            query(':leave', [
                style({ opacity: 1})
            ], { optional: true }),
            query(':enter', [
                style({ transform: 'translateY(20%)'})
            ], { optional: true }),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ opacity: 0}))
                ], { optional: true }),
                query(':enter', [
                    animate('300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1}))
                ], { optional: true })
            ]),
        ])
    ]);


export const myAnimation =
    trigger(
        'myAnimation',
        [
            transition(
                ':enter', [
                    style({opacity: 0}),
                    animate('500ms', style({'opacity': 1}))
                ]
            ),
            transition(
                ':leave', [
                    style({'opacity': 1}),
                    animate('500ms', style({'opacity': 0}))
                ]
            )]
    );

export const fadeAnimation =
    trigger('fadeAnimation', [
        transition( '* <=> *', [
            group([
                query(':leave .nav-icon',
                    [
                        style({ 'transform': 'rotate(0)', 'opacity': '1' }),
                        animate('200ms ease-in-out', style({ 'transform': 'rotate({{leaveDeg}}deg)', 'opacity': '0' }))
                    ],
                    { optional: true }
                ),
                query(':enter .nav-icon',
                    [
                        style({ 'transform': 'rotate({{enterDeg}}deg)', 'opacity': '0' }),
                        animate('200ms ease-in-out', style({ 'transform': 'rotate(0)', 'opacity': '1' }))
                    ],
                    { optional: true }
                ),
                query(':leave .fade',
                    [
                        style({ opacity: 1 }),
                        animate('150ms ease-in', style({ opacity: 0 }))
                    ],
                    { optional: true }
                ),
                query(':enter .fade',
                    [
                        style({ opacity: 0 }),
                        animate('150ms ease-out', style({ opacity: 1 }))
                    ],
                    { optional: true }
                )
            ])
        ])
    ]);
